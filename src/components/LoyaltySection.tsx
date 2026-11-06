import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Award, Compass, Sparkles, Check, Gift, Star, Coffee } from 'lucide-react';

export const LoyaltySection: React.FC = () => {
  const { loyalty, addStamp, redeemLoyaltyReward } = useCafe();
  const [redeemedCode, setRedeemedCode] = useState<{ perk: string; code: string } | null>(null);

  const perks = [
    {
      id: 'p1',
      title: 'Free Sea-Salt Cold Brew',
      pointsReq: 150,
      description: 'Single-origin 18-hour slow steeped brew over ice.',
    },
    {
      id: 'p2',
      title: 'Complimentary Blueberry Cheesecake',
      pointsReq: 250,
      description: 'A decadent slice of our famous New York style cheesecake.',
    },
    {
      id: 'p3',
      title: '20% Off Table Order Bill',
      pointsReq: 300,
      description: 'Applicable on dine-in food & beverages for up to 4 guests.',
    },
  ];

  const handleRedeem = (perk: typeof perks[0]) => {
    const success = redeemLoyaltyReward(perk.title);
    if (success) {
      setRedeemedCode({
        perk: perk.title,
        code: `CAPT-${Math.floor(1000 + Math.random() * 9000)}-FREE`,
      });
    }
  };

  return (
    <section id="loyalty" className="py-16 lg:py-24 bg-[#080F18] border-b border-[#1E2E42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89B3C]">
            <span>Captain's Voyage Club</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Loyalty & Perks</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Sail, Sip & Earn Nautical Miles
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-2">
            Collect stamps with every specialty coffee, level up your cabin tier, and unlock secret menu privileges and free bakes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Voyage Pass / Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Boarding Pass Card */}
            <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#122338] via-[#0E1B2B] to-[#0A1420] border border-[#C89B3C]/40 shadow-2xl overflow-hidden">
              
              {/* Background compass watermark */}
              <Compass className="absolute -right-8 -bottom-8 w-44 h-44 text-[#C89B3C]/5 pointer-events-none" />

              {/* Pass Top Bar */}
              <div className="flex items-center justify-between border-b border-[#1E2E42] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-center text-[#F5C249]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">The Captain's Passport</h3>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-mono">
                      ID: {loyalty.memberId}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#C89B3C] text-[#0B1522] text-xs font-bold uppercase tracking-wider shadow-sm">
                  {loyalty.tier}
                </div>
              </div>

              {/* Member Details */}
              <div className="py-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-[11px] text-[#94A3B8] uppercase">Member Voyager</p>
                    <p className="font-serif text-xl font-bold text-white mt-0.5">{loyalty.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-[#94A3B8] uppercase">Voyage Points</p>
                    <p className="font-serif text-2xl font-bold text-[#F5C249] tabular-nums">
                      {loyalty.points} pts
                    </p>
                  </div>
                </div>

                {/* Tier Progress */}
                <div>
                  <div className="flex justify-between text-xs text-[#94A3B8] mb-1.5">
                    <span>Next Rank: Quartermaster (500 pts)</span>
                    <span className="text-white font-medium">{Math.min(100, Math.round((loyalty.points / 500) * 100))}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0B1522] overflow-hidden border border-[#1E2E42]">
                    <div
                      className="h-full bg-gradient-to-r from-[#C89B3C] to-[#F5C249] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((loyalty.points / 500) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Digital Stamp Card Simulation */}
              <div className="pt-4 border-t border-[#1E2E42]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-white">Coffee Voyage Stamp Card</span>
                  <span className="text-[11px] text-[#D4AF37]">
                    {loyalty.stampsCollected} / 6 Stamps Collected
                  </span>
                </div>

                {/* 6 Stamps Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((idx) => {
                    const isCollected = idx <= loyalty.stampsCollected;
                    const isFreePerkSlot = idx === 6;

                    return (
                      <div
                        key={idx}
                        className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 transition-all ${
                          isCollected
                            ? 'bg-[#153450] border-[#C89B3C] text-[#F5C249] shadow-sm'
                            : isFreePerkSlot
                            ? 'bg-[#122338] border-dashed border-[#C89B3C]/50 text-[#C89B3C]'
                            : 'bg-[#0B1522] border-[#243B55] text-[#475569]'
                        }`}
                      >
                        {isCollected ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : isFreePerkSlot ? (
                          <Gift className="w-4 h-4" />
                        ) : (
                          <Coffee className="w-3.5 h-3.5 opacity-60" />
                        )}
                        <span className="text-[9px] font-mono mt-0.5">
                          {isFreePerkSlot ? 'FREE' : `#${idx}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Stamp Simulation Button */}
                <div className="mt-4 pt-3 flex items-center justify-between gap-3">
                  <p className="text-[11px] text-[#94A3B8]">
                    {loyalty.freeRewardAvailable
                      ? '🎉 6th Stamp Unlocked! You have a free beverage reward.'
                      : 'Simulate purchase at cafe checkout:'}
                  </p>
                  <button
                    onClick={addStamp}
                    className="px-3.5 py-1.5 rounded-lg bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] text-xs font-bold shadow-md transition-all shrink-0"
                  >
                    + Add Stamp
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Perks Catalog & Redeemable Vouchers */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-xl font-bold text-white mb-2">
              Available Captain’s Privileges
            </h3>

            {redeemedCode && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-white space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>Voucher Code Unlocked for {redeemedCode.perk}!</span>
                  </div>
                  <button
                    onClick={() => setRedeemedCode(null)}
                    className="text-xs text-[#94A3B8] hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="flex items-center justify-between bg-[#0B1522] px-4 py-2.5 rounded-xl border border-emerald-800">
                  <span className="font-mono text-sm font-bold text-[#F5C249]">{redeemedCode.code}</span>
                  <span className="text-xs text-[#94A3B8]">Show this to your server</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {perks.map((perk) => {
                const canAfford = loyalty.points >= perk.pointsReq || loyalty.freeRewardAvailable;

                return (
                  <div
                    key={perk.id}
                    className="p-5 rounded-2xl bg-[#122338] border border-[#1E2E42] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#C89B3C]" />
                        <h4 className="font-semibold text-white text-sm">{perk.title}</h4>
                      </div>
                      <p className="text-xs text-[#94A3B8]">{perk.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#F5C249] tabular-nums">
                          {perk.pointsReq}
                        </span>
                        <span className="text-xs text-[#94A3B8] ml-1">pts</span>
                      </div>

                      <button
                        onClick={() => handleRedeem(perk)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          canAfford
                            ? 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] shadow-md'
                            : 'bg-[#1E2E42] text-[#64748B] cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem Voucher' : 'Need More Points'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Loyalty Tiers Explainer */}
            <div className="mt-6 p-5 rounded-2xl bg-[#122338]/50 border border-[#1E2E42] space-y-3">
              <h4 className="text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
                Voyage Rank Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-[#0B1522] border border-[#1E2E42]">
                  <p className="font-semibold text-white">First Mate (200 pts)</p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Free syrup upgrades & priority seating</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0B1522] border border-[#1E2E42]">
                  <p className="font-semibold text-white">Quartermaster (500 pts)</p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Free slice on birthdays & 10% bonus points</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0B1522] border border-[#1E2E42]">
                  <p className="font-semibold text-[#F5C249]">The Captain (1000 pts)</p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Secret menu access & private deck booking</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
