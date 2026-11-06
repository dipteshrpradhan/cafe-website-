import React from 'react';
import { Compass, Instagram, MapPin, Clock, Phone, Mail, ShieldCheck } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const Footer: React.FC = () => {
  const { setIsCMSOpen } = useCafe();

  return (
    <footer className="bg-[#060B12] text-[#94A3B8] border-t border-[#1E2E42] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1E2E42]">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C89B3C] to-[#8C6418] p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0B1522] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#F5C249]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-tight">
                  The Captain's Cafe
                </span>
                <p className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-sans">
                  Bhubaneswar · Odisha
                </p>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              A cozy nautical sanctuary for coffee aficionados, laptop voyagers, and dessert lovers. Handcrafted in the heart of Odisha.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/thecaptainscafe.india/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#122338] border border-[#243B55] flex items-center justify-center text-[#F5C249] hover:border-[#C89B3C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Outlets in Bhubaneswar */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Cafe Outlets
            </h4>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-start gap-2 text-white font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C89B3C] shrink-0 mt-0.5" />
                  <span>Nayapalli Flagship</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] pl-5">
                  Plot 142/B, Near Ekamra Kanan Road & Chillika Fresh, IRC Village, Nayapalli, Bhubaneswar, Odisha 751015
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-start gap-2 text-white font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C89B3C] shrink-0 mt-0.5" />
                  <span>Saheed Nagar Central</span>
                </div>
                <p className="text-[11px] text-[#94A3B8] pl-5">
                  Behind RD Women’s College Road, Saheed Nagar, Bhubaneswar, Odisha 751007
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Hours & Inquiries
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C89B3C] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon – Sun</p>
                  <p className="text-[11px] text-[#94A3B8]">10:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                <span className="text-white">+91 94370 28190 / 0674-2559012</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                <span className="text-white">ahoy@thecaptainscafe.in</span>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Port Navigation & CMS */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Ports
            </h4>

            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Interactive Menu
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-white transition-colors">
                  Table Reservations
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#loyalty" className="hover:text-white transition-colors">
                  Voyage Loyalty Passport
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setIsCMSOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#FBBF24] font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Captain's CMS Bridge</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} The Captain’s Cafe. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>High-Speed Wi-Fi</span>
            <span aria-hidden="true">·</span>
            <span>Dedicated Co-Work Nooks</span>
            <span aria-hidden="true">·</span>
            <span>Pet Friendly Outdoor Deck</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
