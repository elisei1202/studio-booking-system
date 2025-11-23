import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
    }

    const { subscriptionId } = await request.json();

    // Get subscription
    const subscription = await prisma.userSubscription.findUnique({
      where: { id: subscriptionId },
      include: { plan: true },
    });

    if (!subscription) {
      return NextResponse.json({ error: 'Abonament inexistent' }, { status: 404 });
    }

    if (subscription.userId !== user.userId) {
      return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
    }

    if (subscription.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Abonamentul nu este în starea PENDING' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      planId: subscription.plan.id,
      planName: subscription.plan.name,
      amount: subscription.plan.priceLei,
      userId: user.userId,
      subscriptionId: subscription.id,
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: user.userId,
        subscriptionPlanId: subscription.plan.id,
        method: 'STRIPE',
        providerPaymentId: session.id,
        amount: subscription.plan.priceLei,
        currency: 'RON',
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe session error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea sesiunii de plată' },
      { status: 500 }
    );
  }
}
