import { Metadata } from 'next';
import PaymentConfirmation from '@/components/payment/PaymentConfirmation';

export const metadata: Metadata = {
  title: 'Payment Confirmation - ChefConnect',
  description: 'Confirm your payment for chef services.',
};

export default function PaymentConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <PaymentConfirmation />
    </div>
  );
}
