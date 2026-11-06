import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { GalleryItem } from '../types';
import { Heart, Instagram, Maximize2, ExternalLink } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, toggleLikeGallery } = useCafe();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ambiance' | 'coffee' | 'food' | 'community'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredGallery = activeCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#0B1522] border-b border-[#1E2E42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Instagram Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89B3C]">
              <span>Instagram Feed & Memories</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>@thecaptainscafe.india</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Scenes From The Voyage
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base mt-2 max-w-xl">
              Moments captured across our Nayapalli and Saheed Nagar havens — latte art, candlelit evenings, and community stories.
            </p>
          </div>

          <a
            href="https://www.instagram.com/thecaptainscafe.india/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 border border-[#F5C249]/40 text-white text-xs font-semibold hover:border-[#F5C249] transition-all shrink-0"
          >
            <Instagram className="w-4 h-4 text-[#F5C249]" />
            <span>Follow @thecaptainscafe.india</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8]" />
          </a>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'all', label: 'All Snaps' },
            { id: 'ambiance', label: 'Cabin & Deck Ambiance' },
            { id: 'coffee', label: 'Coffee & Brew Craft' },
            { id: 'food', label: 'Plates & Pastries' },
            { id: 'community', label: 'Laptop Nooks & People' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-[#C89B3C] text-[#0B1522] font-semibold'
                  : 'bg-[#122338] text-[#94A3B8] hover:text-white border border-[#1E2E42]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-[#1E2E42] bg-[#122338] aspect-[4/3] flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-[#0B1522]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top overlay items: date & instagram tag */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] text-[#CBD5E1] z-10">
                <span className="bg-[#0B1522]/80 backdrop-blur-sm px-2 py-0.5 rounded border border-[#243B55]">
                  {item.instagramTag}
                </span>
                <span className="text-[#94A3B8] text-[10px]">{item.date}</span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-4 space-y-2">
                <h3 className="font-serif text-base font-bold text-white group-hover:text-[#F5C249] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                {/* Interactive bar */}
                <div className="pt-2 border-t border-[#1E2E42]/60 flex items-center justify-between">
                  {/* Like button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeGallery(item.id);
                    }}
                    className="flex items-center gap-1.5 text-xs text-[#CBD5E1] hover:text-red-400 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/40 hover:fill-red-400" />
                    <span className="tabular-nums font-medium">{item.likes} likes</span>
                  </button>

                  {/* Zoom Lightbox */}
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="text-[#94A3B8] hover:text-white p-1"
                    title="View Full Size"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E1B2B] border border-[#334A65] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#C89B3C] font-semibold uppercase">{selectedImage.instagramTag}</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-0.5">{selectedImage.title}</h3>
                </div>
                <button
                  onClick={() => toggleLikeGallery(selectedImage.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122338] border border-[#243B55] text-xs font-semibold text-white hover:text-red-400"
                >
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  <span>{selectedImage.likes}</span>
                </button>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {selectedImage.caption}
              </p>

              <div className="pt-3 border-t border-[#1E2E42] flex items-center justify-between text-xs text-[#64748B]">
                <span>Shared on {selectedImage.date}</span>
                <a
                  href="https://www.instagram.com/thecaptainscafe.india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline"
                >
                  Open on Instagram →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
