import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Star, MessageSquarePlus, ShieldCheck, Heart, ThumbsUp } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, triggerCMSNotice } = useCafe();
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [visitType, setVisitType] = useState<'Work & Coffee' | 'Friends Hangout' | 'Date Night' | 'Weekend Brunch' | 'Quick Bite'>('Work & Coffee');
  const [comment, setComment] = useState('');
  const [dishRecommended, setDishRecommended] = useState('Wild Blueberry Cheesecake');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    addReview({
      authorName: authorName.trim(),
      rating,
      visitType,
      comment: comment.trim(),
      dishRecommended: dishRecommended.trim() || undefined,
    });

    triggerCMSNotice(`New guest review published by ${authorName}!`);
    setIsWriteReviewOpen(false);
    setAuthorName('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#0B1522] border-b border-[#1E2E42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Rating Breakdown Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89B3C]">
              <span>Diner Testimonials & Lore</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Nayapalli & Saheed Nagar</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Loved by Remote Voyagers & Foodies Alike
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base mt-2 max-w-xl">
              Authentic reviews from guests who visit The Captain’s Cafe for our quiet laptop corners, artisanal roasts, sourdough pizzas, and cozy deck evenings.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#122338] border border-[#1E2E42] rounded-2xl p-5 sm:p-6 shadow-xl flex items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white tabular-nums">4.8</span>
                <span className="text-xs text-[#94A3B8]">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-[#F5C249] mt-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5C249]" />
                ))}
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">Based on 640+ diner ratings</p>
            </div>

            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] text-xs font-bold transition-all shadow-md shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#122338] border border-[#1E2E42] flex flex-col justify-between space-y-4 hover:border-[#C89B3C]/40 transition-colors"
            >
              <div className="space-y-3">
                
                {/* Review Top Meta */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">{rev.authorName}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mt-0.5">
                      <span>{rev.visitType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[#F5C249]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F5C249]" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  "{rev.comment}"
                </p>

              </div>

              {/* Bottom metadata tag */}
              <div className="pt-3 border-t border-[#1E2E42] flex items-center justify-between text-xs">
                {rev.dishRecommended ? (
                  <div className="text-[11px] text-[#C89B3C] font-medium flex items-center gap-1">
                    <Heart className="w-3 h-3 text-[#F5C249] shrink-0" />
                    <span>Recommended: {rev.dishRecommended}</span>
                  </div>
                ) : (
                  <span />
                )}

                {rev.verifiedDiner && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Guest</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1B2B] border border-[#334A65] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between border-b border-[#1E2E42] pb-4">
              <div>
                <span className="text-xs text-[#C89B3C] font-semibold uppercase">Captain’s Guestbook</span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">Share Your Cafe Experience</h3>
              </div>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="text-[#94A3B8] hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-[#F5C249] fill-[#F5C249]'
                            : 'text-[#334A65]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-white ml-2 tabular-nums">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diptesh Pradhan"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                />
              </div>

              {/* Visit Type */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                  Visit Purpose
                </label>
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                >
                  <option value="Work & Coffee">Work & Coffee (Laptop Session)</option>
                  <option value="Friends Hangout">Friends Hangout</option>
                  <option value="Date Night">Date Night</option>
                  <option value="Weekend Brunch">Weekend Brunch</option>
                  <option value="Quick Bite">Quick Bite</option>
                </select>
              </div>

              {/* Recommended dish */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                  Dish You Loved (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wild Blueberry Cheesecake, Sailor's Knot Flat White"
                  value={dishRecommended}
                  onChange={(e) => setDishRecommended(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                  Your Review & Experience *
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell fellow guests about the coffee, Wi-Fi speed, music, or food..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] text-xs font-bold shadow-md transition-all"
                >
                  Publish Review
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
