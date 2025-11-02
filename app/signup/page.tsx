import { Metadata } from 'next';
import CustomerSignupFlow from '@/components/auth/CustomerSignupFlow';

export const metadata: Metadata = {
  title: 'Sign Up - Table & Plate',
  description: 'Join Table & Plate as a customer to find and book private chefs.',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <CustomerSignupFlow />
    </div>
  );
}
