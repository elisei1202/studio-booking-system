import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { SlotPricing } from '@/lib/slots';
import { startOfDay, endOfDay, differenceInDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
    }

    const { date } = await request.json();

    if (!date) {
      return NextResponse.json({ error: 'Data este obligatorie' }, { status: 400 });
    }

    const reservationDate = new Date(date);
    const nightCost = SlotPricing.NIGHT;

    // Get active subscription
    const subscription = await prisma.userSubscription.findFirst({
      where: {
        userId: user.userId,
        status: 'ACTIVE',
        endDate: { gte: new Date() },
      },
      include: { plan: true },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Nu ai un abonament activ' },
        { status: 400 }
      );
    }

    // Check if plan allows night bookings
    if (!subscription.plan.canBookNight) {
      return NextResponse.json(
        { error: 'Abonamentul tău nu permite rezervări pe timp de noapte' },
        { status: 400 }
      );
    }

    // Check if user has enough credits
    if (subscription.remainingCreditUnits < nightCost) {
      return NextResponse.json(
        { error: 'Nu ai suficiente credite' },
        { status: 400 }
      );
    }

    // Check advance booking limit
    const daysInAdvance = differenceInDays(reservationDate, new Date());
    if (daysInAdvance > subscription.plan.advanceBookingDays) {
      return NextResponse.json(
        { error: `Poți rezerva doar cu ${subscription.plan.advanceBookingDays} zile în avans` },
        { status: 400 }
      );
    }

    // Check if night is already booked
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        date: {
          gte: startOfDay(reservationDate),
          lte: endOfDay(reservationDate),
        },
        type: 'NIGHT',
        status: 'CONFIRMED',
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: 'Noaptea este deja rezervată' },
        { status: 400 }
      );
    }

    // Create reservation and update credits
    const reservation = await prisma.reservation.create({
      data: {
        userId: user.userId,
        subscriptionId: subscription.id,
        date: reservationDate,
        slotId: null,
        type: 'NIGHT',
        costCreditUnits: nightCost,
        status: 'CONFIRMED',
      },
    });

    await prisma.userSubscription.update({
      where: { id: subscription.id },
      data: {
        remainingCreditUnits: subscription.remainingCreditUnits - nightCost,
      },
    });

    return NextResponse.json({
      message: 'Rezervare noapte creată cu succes',
      reservation,
    });
  } catch (error) {
    console.error('Night reservation error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea rezervării' },
      { status: 500 }
    );
  }
}
