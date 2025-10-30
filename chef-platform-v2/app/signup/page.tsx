import { Metadata } from 'next';
import CustomerSignupFlow from '@/components/auth/CustomerSignupFlow';
import ChefSignupFlow from '@/components/auth/ChefSignupFlow';

export const metadata: Metadata = {
  title: 'Sign Up - ChefConnect',
  description: 'Join ChefConnect as a customer to find and book private chefs.',
};

export default function SignupPage({ searchParams }: { searchParams?: { role?: string } }) {
  const role = searchParams?.role;
  const isChef = role === 'chef';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {isChef ? <ChefSignupFlow /> : <CustomerSignupFlow />}
    </div>
  );
}
