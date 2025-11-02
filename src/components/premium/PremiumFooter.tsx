// src/components/premium/PremiumFooter.tsx
'use client';

import Link from 'next/link';

/**
 * SELF-CONTAINED PREMIUM FOOTER
 * ✅ Zero dependencies
 * ✅ Fast loading
 * ✅ Mobile responsive
 * ✅ Easy to scale
 */

// ============================================
// CONFIGURATION (Easy to scale)
// ============================================

const FOOTER_LINKS = {
  customers: [
    { label: 'Find a Chef', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
  ],
  chefs: [
    { label: 'Become a Chef', href: '/signup?type=chef' },
    { label: 'Chef Resources', href: '/resources' },
    { label: 'Success Stories', href: '/stories' },
  ],
  support: [
    { label: 'Contact Support', href: '/support' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Safety', href: '/safety' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

interface PremiumFooterProps {
  className?: string;
}

export default function PremiumFooter({ className = '' }: PremiumFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-black border-t border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Customers */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Customers</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.customers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chefs */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Chefs</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.chefs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} Table & Plate. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ in Cape Town, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}