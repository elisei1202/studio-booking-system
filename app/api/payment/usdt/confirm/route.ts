import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acces interzis - doar admin' }, { status: 403 });
    }

    const { paymentId, subscriptionId } = await request.json();

    // Update payment status
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'COMPLETED' },
    });

    // Activate subscription
    await prisma.userSubscription.update({
      where: { id: subscriptionId },
      data: { status: 'ACTIVE' },
    });

    return NextResponse.json({
      message: 'Plată confirmată și abonament activat',
    });
  } catch (error) {
    console.error('USDT confirmation error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la confirmarea plății' },
      { status: 500 }
    );
  }
}
