import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { addDays } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
    }

    const { planId } = await request.json();

    // Get plan details
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan inexistent' }, { status: 404 });
    }

    // Check for active subscription
    const activeSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId: user.userId,
        status: 'ACTIVE',
        endDate: { gte: new Date() },
      },
    });

    if (activeSubscription) {
      return NextResponse.json(
        { error: 'Ai deja un abonament activ' },
        { status: 400 }
      );
    }

    // Create pending subscription
    const subscription = await prisma.userSubscription.create({
      data: {
        userId: user.userId,
        planId: plan.id,
        startDate: new Date(),
        endDate: addDays(new Date(), 30),
        remainingCreditUnits: plan.creditUnits,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      message: 'Abonament creat cu succes',
      subscription,
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea abonamentului' },
      { status: 500 }
    );
  }
}
