/ src/lib/stripe.ts
import Stripe from 'stripe';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

/**
 * Create a payment intent for booking
 */
export async function createPaymentIntent(
  amount: number,
  bookingId: string,
  customerId?: string
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'zar', // South African Rand
      metadata: {
        bookingId,
        customerId: customerId || 'guest',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { paymentIntent, error: null };
  } catch (error: any) {
    console.error('Stripe payment intent error:', error);
    return { paymentIntent: null, error: error.message };
  }
}

/**
 * Create a Stripe customer
 */
export async function createStripeCustomer(
  email: string,
  name: string,
  metadata?: any
) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: metadata || {},
    });

    return { customer, error: null };
  } catch (error: any) {
    console.error('Stripe customer creation error:', error);
    return { customer: null, error: error.message };
  }
}

/**
 * Retrieve payment intent
 */
export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return { paymentIntent, error: null };
  } catch (error: any) {
    console.error('Stripe retrieve payment intent error:', error);
    return { paymentIntent: null, error: error.message };
  }
}

/**
 * Refund a payment
 */
export async function refundPayment(paymentIntentId: string, amount?: number) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined, // Partial refund if amount specified
    });

    return { refund, error: null };
  } catch (error: any) {
    console.error('Stripe refund error:', error);
    return { refund: null, error: error.message };
  }
}

/**
 * Create a payout for chef (for future use)
 */
export async function createPayout(amount: number, chefStripeAccountId: string) {
  try {
    const transfer = await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: 'zar',
      destination: chefStripeAccountId,
    });

    return { transfer, error: null };
  } catch (error: any) {
    console.error('Stripe payout error:', error);
    return { transfer: null, error: error.message };
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    return event;
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return null;
  }
}

/**
 * Handle webhook events
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      // Update booking status in database
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', failedPayment.id);
      // Handle failed payment
      break;

    case 'charge.refunded':
      const refund = event.data.object as Stripe.Charge;
      console.log('Charge refunded:', refund.id);
      // Update booking status
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

/**
 * Calculate platform fee (adjust percentage as needed)
 */
export function calculatePlatformFee(bookingAmount: number): number {
  const feePercentage = 0.1; // 10% platform fee
  return Math.round(bookingAmount * feePercentage * 100) / 100;
}

/**
 * Calculate chef payout
 */
export function calculateChefPayout(bookingAmount: number): number {
  const platformFee = calculatePlatformFee(bookingAmount);
  return bookingAmount - platformFee;
}

/**
 * Format amount for display (R2,500.00)
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
}
