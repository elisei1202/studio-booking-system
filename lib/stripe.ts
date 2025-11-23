import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export interface CreateCheckoutSessionParams {
  planId: string;
  planName: string;
  amount: number;
  userId: string;
  subscriptionId: string;
}

export async function createCheckoutSession(params: CreateCheckoutSessionParams) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'ron',
          product_data: {
            name: `Abonament ${params.planName}`,
            description: 'Studio Booking - Abonament lunar',
          },
          unit_amount: params.amount * 100, // Convert to bani (cents)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/abonamente?cancelled=true`,
    client_reference_id: params.subscriptionId,
    metadata: {
      userId: params.userId,
      planId: params.planId,
      subscriptionId: params.subscriptionId,
    },
  });

  return session;
}
