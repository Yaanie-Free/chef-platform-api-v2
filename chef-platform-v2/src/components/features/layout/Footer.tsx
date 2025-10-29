"use client";
import React from 'react';
import { Button } from '@/components/ui/Button';
import { ReviewExperienceModal } from '@/components/modals/ReviewExperienceModal';
import { Mail, Phone, Instagram, Facebook, Linkedin, Twitter, CircleDot } from 'lucide-react';

export default function Footer() {
  const [reviewOpen, setReviewOpen] = React.useState(false);

  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + CTA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold">T&P</div>
              <div>
                <p className="font-semibold">Table & Plate</p>
                <p className="text-sm text-muted-foreground">Luxury made personal</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              We ensure that only the best chefs have access to our valuable customers, but if you're unsatisfied with the experience, please reach out?
            </p>
            <Button
              className="rounded-2xl bg-primary text-primary-foreground hover:opacity-90"
              onClick={() => setReviewOpen(true)}
            >
              Review your Experience
            </Button>
          </div>

          {/* Contact us */}
          <div className="space-y-3">
            <h4 className="font-semibold">Contact us</h4>
            <div className="space-y-2 text-sm">
              <a href="mailto:hello@tableandplate.co.za" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="w-4 h-4" /> hello@tableandplate.co.za
              </a>
              <a href="mailto:helpdesk@tableandplate.co.za" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="w-4 h-4" /> helpdesk@tableandplate.co.za
              </a>
              <a href="tel:+27123456789" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4" /> +27 12 345 6789
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-3">
            <h4 className="font-semibold">Find us on socials</h4>
            <p className="text-sm text-muted-foreground">Follow us for chef spotlights, culinary inspiration, and exclusive offers.</p>
            <div className="flex items-center gap-2">
              <a aria-label="Instagram" href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-white/5">
                <Instagram className="w-4 h-4" />
              </a>
              <a aria-label="TikTok" href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-white/5">
                <CircleDot className="w-4 h-4" />
              </a>
              <a aria-label="Facebook" href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-white/5">
                <Facebook className="w-4 h-4" />
              </a>
              <a aria-label="X" href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-white/5">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">Tag us @tableandplate to be featured!</p>
          </div>

          {/* Help & resources */}
          <div className="space-y-3">
            <h4 className="font-semibold">Help & resources</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /> Terms & conditions
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/70" /> Privacy policy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
          <p>© 2025 Table & Plate. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground cursor-pointer">Privacy</span>
            <span className="hover:text-foreground cursor-pointer">Terms</span>
            <span className="hover:text-foreground">Made with love in South Africa</span>
          </div>
        </div>
      </div>

      {reviewOpen && (
        <ReviewExperienceModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
      )}
    </footer>
  );
}