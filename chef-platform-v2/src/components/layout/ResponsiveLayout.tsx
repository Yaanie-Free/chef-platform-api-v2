import { cn } from '@/lib/utils';
import React from 'react';

interface ResponsiveLayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveLayout({ children, className, ...props }: ResponsiveLayoutProps) {
  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  );
}