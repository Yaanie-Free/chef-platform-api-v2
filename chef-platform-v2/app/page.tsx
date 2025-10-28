import Header from '@/components/features/layout/Header';
import Footer from '@/components/features/layout/Footer';
import UniversalHero from '@/components/sections/UniversalHero';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <UniversalHero />
      </main>
      
      <Footer />
    </div>
  );
}