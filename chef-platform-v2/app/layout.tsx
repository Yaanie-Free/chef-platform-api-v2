// app/layout.tsx (FINAL CLEANED CODE)

// Correctly imports your custom global CSS with the Inter font setup
import './globals.css'; 
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'ChefConnect Web',
    template: '%s | ChefConnect',
  },
  description: 'Find and book top-rated private chefs in South Africa.',
  applicationName: 'ChefConnect',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'ChefConnect Web',
    description: 'Find and book top-rated private chefs in South Africa.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'ChefConnect',
    url: 'https://example.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChefConnect Web',
    description: 'Find and book top-rated private chefs in South Africa.',
  },
  metadataBase: new URL('https://example.com'),
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground"> 
        {children}
      </body>
    </html>
  );
}