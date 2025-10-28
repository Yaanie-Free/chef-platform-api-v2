import { Mail, Phone, Instagram, Facebook, Twitter, FileText, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { TikTokIcon } from './icons/TikTokIcon';

interface FooterProps {
  onContactClick?: () => void;
  onReviewClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

export function Footer({ 
  onContactClick, 
  onReviewClick, 
  onTermsClick,
  onPrivacyClick 
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/tableandplate',
      color: 'hover:text-pink-500'
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      url: 'https://tiktok.com/@tableandplate',
      color: 'hover:text-cyan-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/tableandplate',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/tableandplate',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/95 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white">
                <span className="text-black font-semibold text-xl">T&P</span>
              </div>
              <div>
                <h3 className="text-lg text-white">Table & Plate</h3>
                <p className="text-sm text-white/70">Luxury made personal</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              We ensure that only the best chefs have access to our valuable customers, but if you're unsatisfied with the experience, please reach out?
            </p>
            <Button
              variant="outline"
              className="w-full rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white border-none hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
              onClick={onReviewClick}
            >
              Review your Experience
            </Button>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact us</h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@tableandplate.co.za"
                className="flex items-center w-full justify-start rounded-2xl hover:bg-white/5 transition-colors p-3 group"
              >
                <Mail className="w-4 h-4 mr-3 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">hello@tableandplate.co.za</span>
              </a>
              <a
                href="mailto:helpdesk@tableandplate.co.za"
                className="flex items-center w-full justify-start rounded-2xl hover:bg-white/5 transition-colors p-3 group"
              >
                <Mail className="w-4 h-4 mr-3 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">helpdesk@tableandplate.co.za</span>
              </a>
              <a
                href="tel:+27123456789"
                className="flex items-center w-full justify-start rounded-2xl hover:bg-white/5 transition-colors p-3 group"
              >
                <Phone className="w-4 h-4 mr-3 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">+27 12 345 6789</span>
              </a>
            </div>
          </div>

          {/* Find Us on Socials */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Find us on socials</h4>
            <p className="text-sm text-white/70">
              Follow us for chef spotlights, culinary inspiration, and exclusive offers.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className={`w-10 h-10 rounded-2xl border-border/50 hover:border-white/50 transition-all duration-200 ${social.color}`}
                    onClick={() => window.open(social.url, '_blank')}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
            <div className="pt-2">
              <p className="text-xs text-white/60">
                Tag us @tableandplate to be featured!
              </p>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Help & resources</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-2xl hover:bg-white/5 transition-colors p-3 text-white"
                onClick={onTermsClick}
              >
                <FileText className="w-4 h-4 mr-3 text-white/70" />
                <span className="text-sm">Terms & conditions</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-2xl hover:bg-white/5 transition-colors p-3 text-white"
                onClick={onPrivacyClick}
              >
                <Shield className="w-4 h-4 mr-3 text-white/70" />
                <span className="text-sm">Privacy policy</span>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60 text-center md:text-left">
            © {currentYear} Table & Plate. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <button 
              onClick={onPrivacyClick}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <span>•</span>
            <button 
              onClick={onTermsClick}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
            <span>•</span>
            <span>Made with love in South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}