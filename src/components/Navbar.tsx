import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { ShoppingBag, Compass, ShieldCheck, Menu as MenuIcon, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsCMSOpen, announcement } = useCafe();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Ticker for Seasonal Announcement if active */}
      {announcement.isActive && (
        <aside aria-label="Announcement" className="bg-[#122338] border-b border-[#C89B3C]/20 px-4 py-2 text-center text-xs sm:text-sm text-[#F3F4F6] flex items-center justify-center gap-2">
          <span className="font-semibold text-[#D4AF37] tracking-wider uppercase text-[11px] bg-[#0B1522] px-2 py-0.5 rounded border border-[#C89B3C]/30">
            {announcement.badge}
          </span>
          <span className="text-[#E2E8F0] font-normal truncate max-w-xl">
            {announcement.headline}
          </span>
          {announcement.actionText && (
            <a
              href={announcement.actionTarget || '#menu'}
              className="text-[#FBBF24] underline underline-offset-2 hover:text-white transition-colors shrink-0 ml-1 text-xs font-medium"
            >
              {announcement.actionText} →
            </a>
          )}
        </aside>
      )}

      {/* Main Navigation: 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#0B1522]/95 backdrop-blur-md border-b border-[#1E2E42] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single element brand wordmark */}
          <a href="#" className="flex items-center gap-3 whitespace-nowrap shrink-0 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C89B3C] to-[#8C6418] p-0.5 flex items-center justify-center shadow-lg shadow-[#0B1522]/50">
              <div className="w-full h-full rounded-full bg-[#0B1522] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#F5C249] group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F5C249] transition-colors">
                Captain's Cafe
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#94A3B8] font-sans -mt-0.5">
                Bhubaneswar · Nayapalli
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#CBD5E1]">
            <a
              href="#menu"
              className="hover:text-[#F5C249] transition-colors whitespace-nowrap shrink-0"
            >
              Interactive Menu
            </a>
            <a
              href="#reservations"
              className="hover:text-[#F5C249] transition-colors whitespace-nowrap shrink-0"
            >
              Table Reservations
            </a>
            <a
              href="#gallery"
              className="hover:text-[#F5C249] transition-colors whitespace-nowrap shrink-0"
            >
              Visual Gallery
            </a>
            <a
              href="#loyalty"
              className="hover:text-[#F5C249] transition-colors whitespace-nowrap shrink-0"
            >
              Voyage Club
            </a>
            <a
              href="#reviews"
              className="hover:text-[#F5C249] transition-colors whitespace-nowrap shrink-0"
            >
              Guest Reviews
            </a>
          </nav>

          {/* Zone 3: Primary Action + CMS Bridge Access */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Captain's CMS Bridge button */}
            <button
              onClick={() => setIsCMSOpen(true)}
              title="Open Content Management System (Push dishes, reservations, announcements)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#334A65] bg-[#122338] text-xs font-medium text-[#CBD5E1] hover:text-white hover:border-[#C89B3C] transition-colors whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Captain's CMS</span>
            </button>

            {/* Table Order / Cart Tray */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Order Tray"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] font-semibold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Tray</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center bg-[#0B1522] text-[#F5C249] text-xs font-bold w-5 h-5 rounded-full ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2E42]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#1E2E42] bg-[#0E1B2B] px-6 py-5 space-y-3">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#E2E8F0] hover:text-[#F5C249]"
            >
              Interactive Menu
            </a>
            <a
              href="#reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#E2E8F0] hover:text-[#F5C249]"
            >
              Table Reservations
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#E2E8F0] hover:text-[#F5C249]"
            >
              Visual Gallery
            </a>
            <a
              href="#loyalty"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#E2E8F0] hover:text-[#F5C249]"
            >
              Voyage Club
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#E2E8F0] hover:text-[#F5C249]"
            >
              Guest Reviews
            </a>
            <div className="pt-3 border-t border-[#1E2E42] flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCMSOpen(true);
                }}
                className="flex items-center gap-2 text-sm text-[#D4AF37] font-medium"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Captain's CMS Bridge</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
