import React, { useState, useMemo } from 'react';
import { useCafe } from '../context/CafeContext';
import { MenuItem, DietaryType } from '../types';
import { Search, Plus, Check, Clock, Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'All Items',
  'Specialty Brews',
  'Burgers & Sandwiches',
  'Stone-Baked Pizzas',
  'Pastas & Mains',
  'Signature Beverages',
  'Desserts & Bakes',
  'Quick Bites & Platters',
];

export const MenuSection: React.FC = () => {
  const { menuItems, addToCart, cart } = useCafe();
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | DietaryType | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'prep'>('recommended');

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedMilk, setSelectedMilk] = useState('Whole Milk');
  const [selectedSugar, setSelectedSugar] = useState('Normal (1 Spoon)');
  const [extraNote, setExtraNote] = useState('');

  // Added notification feedback
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  const handleAddCustomized = () => {
    if (!customizingItem) return;
    addToCart(customizingItem, {
      milkChoice: customizingItem.category.includes('Brew') ? selectedMilk : undefined,
      sugarLevel: customizingItem.category.includes('Brew') || customizingItem.category.includes('Beverage') ? selectedSugar : undefined,
      extraNote: extraNote.trim() ? extraNote.trim() : undefined,
    });
    setJustAddedId(customizingItem.id);
    setCustomizingItem(null);
    setExtraNote('');
    setTimeout(() => setJustAddedId(null), 1200);
  };

  // Filtered and sorted menu items
  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All Items' && item.category !== selectedCategory) {
          return false;
        }
        // Dietary filter
        if (dietaryFilter === 'special') {
          if (!item.isChefSpecial && !item.isPopular && !item.isSeasonal) return false;
        } else if (dietaryFilter !== 'all') {
          if (item.dietary !== dietaryFilter) return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'prep') return (a.prepTimeMinutes || 10) - (b.prepTimeMinutes || 10);
        return (b.isChefSpecial ? 1 : 0) - (a.isChefSpecial ? 1 : 0);
      });
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#0B1522] border-b border-[#1E2E42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C89B3C]">
            <span>Voyage Provisions</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Hand-Crafted in Bhubaneswar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            The Captain’s Culinary Roster
          </h2>
          <p className="text-[#94A3B8] text-base mt-2">
            From sunrise flat whites and artisanal brunch toasties to wood-fired truffle sourdough pizzas and decadent bakes. Add items to your table tray or pre-order for collection.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#122338] border border-[#1E2E42] rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-xl">
          
          {/* Row 1: Search & Sort */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search specialty coffee, burgers, cheesecake, pizzas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[#C89B3C] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Filter Segmented Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0B1522] rounded-xl border border-[#243B55] overflow-x-auto shrink-0">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-[#C89B3C] text-[#0B1522] font-semibold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'text-[#94A3B8] hover:text-emerald-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Pure Veg
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-red-950 text-red-300 border border-red-500/40'
                    : 'text-[#94A3B8] hover:text-red-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                Non-Veg
              </button>
              <button
                onClick={() => setDietaryFilter('special')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  dietaryFilter === 'special'
                    ? 'bg-[#C89B3C]/20 text-[#F5C249] border border-[#C89B3C]/40'
                    : 'text-[#94A3B8] hover:text-[#F5C249]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#F5C249]" />
                Chef's Picks
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#64748B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0B1522] border border-[#243B55] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C89B3C]"
              >
                <option value="recommended">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="prep">Fastest Prep Time</option>
              </select>
            </div>

          </div>

          {/* Row 2: Category Horizontal Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0B1522] font-semibold shadow-sm'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1E2E42]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#122338]/40 border border-[#1E2E42] rounded-2xl p-8">
            <AlertCircle className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No dishes found</h3>
            <p className="text-sm text-[#94A3B8] mt-1 max-w-sm mx-auto">
              We couldn't find any dishes matching "{searchQuery}" with the current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Items');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#1E2E42] text-xs font-medium text-white hover:bg-[#C89B3C] hover:text-[#0B1522] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const cartItem = cart.find((ci) => ci.item.id === item.id);
              const inCartQty = cartItem?.quantity || 0;
              const isAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#122338] ${
                    item.inStock
                      ? 'border-[#1E2E42] hover:border-[#C89B3C]/50 hover:shadow-xl hover:shadow-black/40'
                      : 'border-red-950/40 opacity-75'
                  }`}
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1522]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Dietary dot badge */}
                      <div className="absolute top-3 left-3 bg-[#0B1522]/85 backdrop-blur-md px-2 py-1 rounded-md border border-[#334A65] flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.dietary === 'veg'
                              ? 'bg-emerald-400'
                              : item.dietary === 'vegan'
                              ? 'bg-teal-400'
                              : 'bg-red-400'
                          }`}
                        />
                        <span className="text-[10px] uppercase font-semibold text-[#CBD5E1]">
                          {item.dietary}
                        </span>
                      </div>

                      {/* Out of Stock overlay if disabled */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-[#0B1522]/85 flex items-center justify-center p-4 text-center">
                          <span className="text-xs font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800">
                            Sold Out Today
                          </span>
                        </div>
                      )}

                      {/* Prep time badge */}
                      {item.prepTimeMinutes && (
                        <div className="absolute bottom-2.5 right-3 bg-[#0B1522]/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#94A3B8] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#C89B3C]" />
                          <span>{item.prepTimeMinutes} mins</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      
                      {/* Unboxed Metadata Line */}
                      <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                        <span className="text-[#C89B3C] font-medium">{item.category}</span>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                            <span>{item.tags[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F5C249] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#94A3B8] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="p-5 pt-0 border-t border-[#1E2E42]/60 mt-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-[#64748B] uppercase font-medium">Price</p>
                      <p className="font-serif text-xl font-bold text-white tabular-nums">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Customize button */}
                      <button
                        onClick={() => {
                          setCustomizingItem(item);
                          setSelectedMilk('Whole Milk');
                          setSelectedSugar('Normal (1 Spoon)');
                          setExtraNote('');
                        }}
                        disabled={!item.inStock}
                        title="Customize (Milk, sweetness, spice preferences)"
                        className="px-2.5 py-2 rounded-lg bg-[#0B1522] hover:bg-[#1E2E42] border border-[#243B55] text-xs font-medium text-[#CBD5E1] transition-colors disabled:opacity-40"
                      >
                        Options
                      </button>

                      {/* Add Button */}
                      <button
                        onClick={() => handleQuickAdd(item)}
                        disabled={!item.inStock}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold text-xs transition-all shadow-md ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : inCartQty > 0
                            ? 'bg-[#153450] text-[#F5C249] border border-[#C89B3C]/50'
                            : 'bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522]'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : inCartQty > 0 ? (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>In Tray ({inCartQty})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Tray</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#122338] border border-[#334A65] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between border-b border-[#1E2E42] pb-4">
              <div>
                <span className="text-xs text-[#C89B3C] font-semibold uppercase">{customizingItem.category}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">{customizingItem.name}</h3>
                <p className="font-serif text-lg font-bold text-[#F5C249] mt-1 tabular-nums">₹{customizingItem.price}</p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-[#94A3B8] hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              {/* Milk preference if beverage */}
              {(customizingItem.category.includes('Brew') || customizingItem.category.includes('Beverage')) && (
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-2">
                    Milk Choice
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Whole Milk', 'Oat Milk (+₹30)', 'Almond Milk (+₹35)'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMilk(m)}
                        className={`p-2 rounded-lg text-xs font-medium text-center border transition-all ${
                          selectedMilk === m
                            ? 'bg-[#C89B3C] text-[#0B1522] font-semibold border-[#C89B3C]'
                            : 'bg-[#0B1522] text-[#94A3B8] border-[#243B55] hover:text-white'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness */}
              {(customizingItem.category.includes('Brew') || customizingItem.category.includes('Beverage')) && (
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-2">
                    Sweetness Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Sugar-Free', 'Normal (1 Spoon)', 'Extra Sweet'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSugar(s)}
                        className={`p-2 rounded-lg text-xs font-medium text-center border transition-all ${
                          selectedSugar === s
                            ? 'bg-[#C89B3C] text-[#0B1522] font-semibold border-[#C89B3C]'
                            : 'bg-[#0B1522] text-[#94A3B8] border-[#243B55] hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special instructions */}
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                  Kitchen / Barista Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Extra hot, crispier fries, spicy peri-peri on the side..."
                  value={extraNote}
                  onChange={(e) => setExtraNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCustomizingItem(null)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCustomized}
                className="px-5 py-2.5 rounded-lg bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] font-semibold text-xs shadow-md transition-all"
              >
                Add Customized to Tray
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
