import { Metadata } from 'next';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';

export const metadata: Metadata = {
  title: 'Dashboard - ChefConnect',
  description: 'Manage your bookings and chef services.',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerDashboard />
    </div>
  );
}
