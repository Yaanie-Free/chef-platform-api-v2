import { Bell, MessageCircle, User, Phone, ChefHat } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  userName?: string;
  notificationCount?: number;
  messageCount?: number;
  isLoggedIn?: boolean;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onProfileClick?: () => void;
  onContactClick?: () => void;
  onChefSignupClick?: () => void;
}

export function Header({ 
  userName = "Guest", 
  notificationCount = 0, 
  messageCount = 0,
  isLoggedIn = false,
  onSearch,
  onNotificationClick,
  onMessageClick,
  onProfileClick,
  onContactClick,
  onChefSignupClick
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/95">
      <div className="container relative flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white">
            <span className="text-black text-lg font-semibold">T&P</span>
          </div>
        </div>

        {/* Centered Search Bar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          {onSearch && (
            <SearchBar 
              onSearch={onSearch}
              placeholder="Search all private chefs"
            />
          )}
        </div>

        {/* Action Buttons - Far Right */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          {/* Messages - Only show when logged in */}
          {isLoggedIn && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative rounded-2xl hover:bg-white/5 transition-colors text-white"
              onClick={onMessageClick}
            >
              <MessageCircle className="w-5 h-5" />
              {messageCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-white text-black">
                  {messageCount > 9 ? '9+' : messageCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Chef Signup */}
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white border-none hover:from-pink-600 hover:to-rose-600 transition-all duration-200 px-4"
            onClick={onChefSignupClick}
          >
            <ChefHat className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline text-sm">Chef Signup</span>
            <span className="sm:hidden text-sm">Chef</span>
          </Button>

          {/* Profile */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-2xl flex items-center gap-2 px-3 hover:bg-white/5 transition-colors text-white"
            onClick={onProfileClick}
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">{userName}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}