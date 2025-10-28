import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Toaster } from '@/components/ui/sonner';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-black min-h-screen">
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
