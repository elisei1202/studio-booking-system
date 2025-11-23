import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const subscriptionId = session.client_reference_id;
      const paymentId = session.id;

      // Update subscription to ACTIVE
      await prisma.userSubscription.update({
        where: { id: subscriptionId },
        data: { status: 'ACTIVE' },
      });

      // Update payment to COMPLETED
      await prisma.payment.updateMany({
        where: {
          providerPaymentId: paymentId,
          method: 'STRIPE',
        },
        data: { status: 'COMPLETED' },
      });

      console.log('Subscription activated:', subscriptionId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
