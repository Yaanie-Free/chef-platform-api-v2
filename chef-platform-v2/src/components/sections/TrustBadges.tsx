import React from 'react';

export default function TrustBadges() {
  return (
    <section className="py-8">
      <div className="container grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-muted-foreground">
        <div>Verified Chefs</div>
        <div>Secure Payments</div>
        <div>24/7 Support</div>
        <div>4.9★ Average Rating</div>
      </div>
    </section>
  );
}
