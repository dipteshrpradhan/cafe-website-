import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { OutletLocation, SeatingZone, Reservation } from '../types';
import { Calendar, Users, MapPin, Clock, CheckCircle2, QrCode, Sparkles, Copy, Check } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { addReservation, triggerCMSNotice } = useCafe();

  const [outlet, setOutlet] = useState<OutletLocation>('Nayapalli (Ekamra Kanan Road)');
  const [zone, setZone] = useState<SeatingZone>('Captain\'s Cabin (Indoor AC Lounge)');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('07:30 PM (Evening Dinner)');
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Casual Catchup & Coffee');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation modal state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) return;

    const res = addReservation({
      outlet,
      zone,
      date,
      timeSlot,
      guestsCount,
      guestName,
      phone,
      email: email || `${guestName.toLowerCase().replace(/\s+/g, '')}@guest.cafe`,
      occasion,
      specialRequests,
    });

    setConfirmedReservation(res);
    triggerCMSNotice(`New Table Reservation booked: ${res.guestName} (${res.outlet})`);
  };

  const handleCopyPass = () => {
    if (!confirmedReservation) return;
    const text = `⚓ Captain's Cafe Reservation Confirmed!\nBooking ID: ${confirmedReservation.id}\nGuest: ${confirmedReservation.guestName}\nOutlet: ${confirmedReservation.outlet}\nDate & Time: ${confirmedReservation.date} at ${confirmedReservation.timeSlot}\nZone: ${confirmedReservation.zone}\nParty Size: ${confirmedReservation.guestsCount} Guests`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="reservations" className="py-16 lg:py-24 bg-[#080F18] border-b border-[#1E2E42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89B3C] mb-2">
            <span>Guaranteed Seating</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Zero Booking Fee</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Reserve Your Voyage Table
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-2">
            Whether it’s a focused laptop work session by the garden glass window, a weekend celebration, or an intimate dinner under brass marine lanterns.
          </p>
        </div>

        {/* Reservation Container Card */}
        <div className="max-w-4xl mx-auto bg-[#122338] border border-[#1E2E42] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Outlet Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-2">
                Select Cafe Outlet in Bhubaneswar
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOutlet('Nayapalli (Ekamra Kanan Road)')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    outlet === 'Nayapalli (Ekamra Kanan Road)'
                      ? 'bg-[#153450] border-[#C89B3C] text-white shadow-md'
                      : 'bg-[#0B1522] border-[#243B55] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-white">Nayapalli Outlet</span>
                    <MapPin className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-1">Near Ekamra Kanan Road / Chillika Fresh</p>
                  <p className="text-[11px] text-[#38BDF8] mt-1 font-medium">Lush greenery view · Outdoor deck</p>
                </button>

                <button
                  type="button"
                  onClick={() => setOutlet('Saheed Nagar (Bhubaneswar Central)')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    outlet === 'Saheed Nagar (Bhubaneswar Central)'
                      ? 'bg-[#153450] border-[#C89B3C] text-white shadow-md'
                      : 'bg-[#0B1522] border-[#243B55] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-white">Saheed Nagar Outlet</span>
                    <MapPin className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-1">Bhubaneswar Central Arts District</p>
                  <p className="text-[11px] text-[#38BDF8] mt-1 font-medium">Urban nautical vibe · Fast transit</p>
                </button>
              </div>
            </div>

            {/* Step 2: Zone & Ambiance */}
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-2">
                Preferred Seating Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    name: 'Captain\'s Cabin (Indoor AC Lounge)',
                    subtitle: 'Cozy booths, marine wood beams, soft ambient jazz',
                  },
                  {
                    name: 'The Sun Deck (Lush Garden Terrace)',
                    subtitle: 'Open air, evening fairy lights, pet friendly',
                  },
                  {
                    name: 'The Library Nook (Quiet Work Corner)',
                    subtitle: 'Optic fiber Wi-Fi, individual charging ports',
                  },
                ].map((z) => (
                  <button
                    key={z.name}
                    type="button"
                    onClick={() => setZone(z.name as SeatingZone)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      zone === z.name
                        ? 'bg-[#153450] border-[#C89B3C] text-white'
                        : 'bg-[#0B1522] border-[#243B55] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <p className="font-semibold text-xs text-white">{z.name}</p>
                    <p className="text-[11px] text-[#94A3B8] mt-1 leading-snug">{z.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                  Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  >
                    <option value="11:00 AM (Morning Brew & Work)">11:00 AM (Morning Brew & Work)</option>
                    <option value="01:30 PM (Afternoon Lunch & Brunch)">01:30 PM (Afternoon Lunch & Brunch)</option>
                    <option value="04:30 PM (High Tea & Cheesecake)">04:30 PM (High Tea & Cheesecake)</option>
                    <option value="07:30 PM (Evening Dinner)">07:30 PM (Evening Dinner)</option>
                    <option value="09:00 PM (Late Night Chill)">09:00 PM (Late Night Chill)</option>
                  </select>
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                  Party Size
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#C89B3C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest (Solo Work)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Step 4: Contact & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diptesh Pradhan"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                  Phone Number (+91) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98610 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                >
                  <option value="Casual Catchup & Coffee">Casual Catchup & Coffee</option>
                  <option value="Laptop Work / Coding">Laptop Work / Coding</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Romantic Date Night">Romantic Date Night</option>
                  <option value="Family Weekend Brunch">Family Weekend Brunch</option>
                </select>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-1.5">
                Special Requests or Dietary Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Need high-speed socket near seat, preparing birthday pastry surprise, pet accompanying on deck..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] font-serif font-bold text-base shadow-lg shadow-[#C89B3C]/20 hover:shadow-xl transition-all"
              >
                Confirm Table Reservation (Instant Confirmation)
              </button>
              <p className="text-center text-xs text-[#94A3B8] mt-2">
                No credit card required. We hold tables for 15 minutes past reservation time.
              </p>
            </div>

          </form>
        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1B2B] border border-[#334A65] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs text-[#94A3B8]">
                We have registered your table in the Captain’s log.
              </p>
            </div>

            {/* Nautical Boarding Pass style ticket */}
            <div className="bg-[#122338] border border-[#C89B3C]/40 rounded-2xl p-5 relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E2E42] pb-3">
                <div>
                  <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Captain's Boarding Pass
                  </span>
                  <p className="font-mono text-lg font-bold text-white mt-0.5">
                    {confirmedReservation.id}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#0B1522] border border-[#243B55] px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5C249]" />
                  <span>{confirmedReservation.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[#94A3B8]">Guest</p>
                  <p className="font-semibold text-white mt-0.5">{confirmedReservation.guestName}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8]">Party Size</p>
                  <p className="font-semibold text-white mt-0.5">{confirmedReservation.guestsCount} Guests</p>
                </div>
                <div>
                  <p className="text-[#94A3B8]">Date & Time</p>
                  <p className="font-semibold text-white mt-0.5">{confirmedReservation.date} · {confirmedReservation.timeSlot.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8]">Seating Zone</p>
                  <p className="font-semibold text-white mt-0.5 truncate">{confirmedReservation.zone.split('(')[0]}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E2E42] flex items-center justify-between text-xs text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span className="truncate">{confirmedReservation.outlet}</span>
                </div>
                <QrCode className="w-5 h-5 text-[#C89B3C]" />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyPass}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E2E42] hover:bg-[#243B55] text-white text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Details!' : 'Copy Reservation Pass'}</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="flex-1 py-3 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
