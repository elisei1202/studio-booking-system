import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

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

    // Get USDT price based on plan
    const usdtPriceMap: Record<string, string> = {
      BASIC: process.env.USDT_PRICE_PER_SUBSCRIPTION_BASIC || '12',
      STANDARD: process.env.USDT_PRICE_PER_SUBSCRIPTION_STANDARD || '15',
      PREMIUM: process.env.USDT_PRICE_PER_SUBSCRIPTION_PREMIUM || '18',
    };

    const usdtAmount = usdtPriceMap[subscription.plan.name] || '12';

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.userId,
        subscriptionPlanId: subscription.plan.id,
        method: 'USDT',
        amount: parseInt(usdtAmount),
        currency: 'USDT',
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      usdtAddress: process.env.USDT_TRC20_ADDRESS,
      amount: usdtAmount,
      currency: 'USDT',
      network: 'TRC20',
      instructions: 'Trimite exact suma indicată la adresa de mai sus și păstrează dovada plății.',
    });
  } catch (error) {
    console.error('USDT payment creation error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la crearea plății USDT' },
      { status: 500 }
    );
  }
}
