import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { getSlotById } from '@/lib/slots';
import { startOfDay, endOfDay, differenceInDays, getDay } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
    }

    const { date, slotId } = await request.json();

    if (!date || !slotId) {
      return NextResponse.json(
        { error: 'Data și slotul sunt obligatorii' },
        { status: 400 }
      );
    }

    const reservationDate = new Date(date);
    const slot = getSlotById(slotId);

    if (!slot) {
      return NextResponse.json({ error: 'Slot invalid' }, { status: 400 });
    }

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

    // Check if user has enough credits
    if (subscription.remainingCreditUnits < slot.pricing) {
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

    // Check if it's weekend and plan has weekend limit
    const dayOfWeek = getDay(reservationDate);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    if (isWeekend && subscription.plan.weekendLimit !== null) {
      const weekendReservations = await prisma.reservation.count({
        where: {
          userId: user.userId,
          subscriptionId: subscription.id,
          status: 'CONFIRMED',
        },
      });

      if (weekendReservations >= subscription.plan.weekendLimit) {
        return NextResponse.json(
          { error: `Ai atins limita de ${subscription.plan.weekendLimit} rezervări pentru weekend în această lună` },
          { status: 400 }
        );
      }
    }

    // Check if slot is already booked
    const existingReservation = await prisma.reservation.findFirst({
      where: {
        date: {
          gte: startOfDay(reservationDate),
          lte: endOfDay(reservationDate),
        },
        slotId,
        type: 'DAY_SLOT',
        status: 'CONFIRMED',
      },
    });

    if (existingReservation) {
      return NextResponse.json(
        { error: 'Acest slot este deja rezervat' },
        { status: 400 }
      );
    }

    // Create reservation and update credits
    const reservation = await prisma.reservation.create({
      data: {
        userId: user.userId,
        subscriptionId: subscription.id,
        date: reservationDate,
        slotId,
        type: 'DAY_SLOT',
        costCreditUnits: slot.pricing,
        status: 'CONFIRMED',
      },
    });

    await prisma.userSubscription.update({
      where: { id: subscription.id },
      data: {
        remainingCreditUnits: subscription.remainingCreditUnits - slot.pricing,
      },
    });

    return NextResponse.json({
      message: 'Rezervare creată cu succes',
      reservation,
    });
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea rezervării' },
      { status: 500 }
    );
  }
}
