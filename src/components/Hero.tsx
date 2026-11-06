import React from 'react';
import { ArrowRight, Coffee, Laptop, Utensils, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#0B1522] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1E2E42]">
      {/* Background nautical subtle light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C89B3C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#153450]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Metadata Kicker (Anti-pill) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#C89B3C]">
              <span>Nayapalli & Saheed Nagar</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Specialty Coffee</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Artisanal Bistro</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl/tight font-bold text-white tracking-tight text-balance">
              Where the aroma of freshly roasted coffee meets oceanic warmth.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
              Welcome aboard <strong className="text-white font-medium">The Captain’s Cafe</strong>. Bhubaneswar’s favorite sanctuary for quiet remote work, rich velvety flat whites, hand-tossed stone-baked sourdough pizzas, and legendary wild blueberry cheesecake.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] font-semibold text-sm transition-all shadow-lg shadow-[#C89B3C]/20 hover:shadow-xl hover:translate-y-[-1px]"
              >
                <span>Explore Interactive Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#reservations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-[#334A65] hover:border-[#C89B3C] bg-[#122338]/60 hover:bg-[#122338] text-white font-medium text-sm transition-colors"
              >
                <span>Reserve a Table</span>
              </a>
            </div>

            {/* Authentic Trust Strip (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-[#1E2E42] grid grid-cols-3 gap-4">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-white tabular-nums">4.8 / 5.0</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">Diner rating on Instagram & Google</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-white tabular-nums">100%</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">Single-Estate Arabica Beans</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-white tabular-nums">High-Speed</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">Fiber Wi-Fi & Work Booths</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#1E2E42] shadow-2xl bg-[#122338]">
              
              {/* Photo */}
              <div className="aspect-[16/10] sm:aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/hero_captains_cafe_1793944935685.jpg"
                  alt="Interior of The Captain's Cafe in Nayapalli, Bhubaneswar"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Photo Scrim Overlay with Subtle Highlights */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-transparent to-black/20 pointer-events-none" />

              {/* Inset Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B1522]/90 backdrop-blur-md border border-[#C89B3C]/30 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-center text-[#F5C249] shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">The Captain's Cabin Experience</h2>
                    <p className="text-xs text-[#94A3B8]">Nayapalli, Near Ekamra Kanan Road · Open Daily 10 AM – 11 PM</p>
                  </div>
                </div>

                <a
                  href="#reservations"
                  className="hidden sm:inline-flex text-xs font-semibold text-[#D4AF37] hover:text-[#FBBF24] whitespace-nowrap"
                >
                  Book Booth →
                </a>
              </div>

            </div>

            {/* Feature Highlights beneath visual */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-[#CBD5E1]">
              <div className="p-2.5 rounded-lg bg-[#122338]/50 border border-[#1E2E42] flex items-center justify-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span className="truncate">Laptop Friendly</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#122338]/50 border border-[#1E2E42] flex items-center justify-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span className="truncate">Stone-Baked Pizzas</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#122338]/50 border border-[#1E2E42] flex items-center justify-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span className="truncate">Blueberry Cheesecake</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
