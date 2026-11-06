/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { LoyaltySection } from './components/LoyaltySection';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { CMSAdmin } from './components/CMSAdmin';
import { Footer } from './components/Footer';
import { ShieldCheck, Sparkles, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { cmsNotice, setIsCMSOpen } = useCafe();

  return (
    <div className="min-h-screen bg-[#0B1522] text-[#F3F4F6] selection:bg-[#D4AF37]/30 selection:text-[#FBBF24]">
      {/* Toast Notification when CMS or Order updates occur */}
      {cmsNotice && (
        <aside
          aria-label="CMS Notification"
          className="fixed bottom-6 left-6 z-50 bg-[#122338] border border-[#C89B3C]/70 shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-3 text-xs text-white animate-in slide-in-from-bottom duration-300 max-w-md"
        >
          <div className="w-7 h-7 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-center text-[#F5C249] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="flex-1 font-medium">{cmsNotice}</p>
        </aside>
      )}

      {/* Floating Captain's CMS Quick Launcher Badge */}
      <aside
        aria-label="Admin Access"
        className="fixed bottom-6 right-6 z-30 hidden sm:block"
      >
        <button
          onClick={() => setIsCMSOpen(true)}
          title="Open Captain's Bridge (CMS) to push dishes or seasonal updates"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#122338]/90 hover:bg-[#153450] border border-[#C89B3C]/50 text-white text-xs font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all backdrop-blur-md group"
        >
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span>Captain's CMS Bridge</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-0.5" />
        </button>
      </aside>

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Interactive Menu Section */}
        <MenuSection />

        {/* Table Reservation System */}
        <ReservationSection />

        {/* Visual Gallery & Instagram Feed */}
        <GallerySection />

        {/* Loyalty Club & Rewards */}
        <LoyaltySection />

        {/* Customer Reviews & Testimonials */}
        <ReviewsSection />
      </main>

      {/* Slide-out Order Cart Drawer */}
      <CartDrawer />

      {/* Content Management System (CMS) Modal */}
      <CMSAdmin />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <MainAppContent />
    </CafeProvider>
  );
}
