import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type HeaderProps = {
  onChefSignupClick?: () => void;
};

export default function Header({ onChefSignupClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-black/40 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-3">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold">T&P</span>
          </Link>

          {/* Center: Search */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search all private chefs"
                className="pl-9 rounded-2xl bg-white/10 border-white/10 text-foreground placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Right: CTAs */}
          <div className="ml-auto flex items-center gap-3">
            {onChefSignupClick ? (
              <Button onClick={onChefSignupClick} className="hidden sm:inline-flex rounded-2xl bg-primary text-primary-foreground hover:opacity-90">Chef Signup</Button>
            ) : (
              <Link href="/signup?role=chef" className="hidden sm:inline-flex">
                <Button className="rounded-2xl bg-primary text-primary-foreground hover:opacity-90">Chef Signup</Button>
              </Link>
            )}
            <Link href="/signup?role=guest" className="text-white/90 hover:text-white text-sm">Guest</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}