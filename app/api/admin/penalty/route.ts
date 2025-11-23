import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acces interzis - doar admin' }, { status: 403 });
    }

    const { reservationId, penaltyUnits } = await request.json();

    if (!reservationId || !penaltyUnits) {
      return NextResponse.json(
        { error: 'ID rezervare și unități penalizare sunt obligatorii' },
        { status: 400 }
      );
    }

    // Valid penalty values: 100 (1 credit) or 200 (2 credits)
    if (penaltyUnits !== 100 && penaltyUnits !== 200) {
      return NextResponse.json(
        { error: 'Penalizare invalidă. Alege 100 sau 200 unități' },
        { status: 400 }
      );
    }

    // Get reservation
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { subscription: true },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Rezervare inexistentă' }, { status: 404 });
    }

    // Apply penalty to reservation
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { penaltyUnits },
    });

    // Deduct credits from subscription
    const newCreditUnits = Math.max(
      0,
      reservation.subscription.remainingCreditUnits - penaltyUnits
    );

    await prisma.userSubscription.update({
      where: { id: reservation.subscriptionId },
      data: { remainingCreditUnits: newCreditUnits },
    });

    return NextResponse.json({
      message: `Penalizare de ${penaltyUnits / 100} credite aplicată cu succes`,
    });
  } catch (error) {
    console.error('Penalty error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la aplicarea penalizării' },
      { status: 500 }
    );
  }
}
