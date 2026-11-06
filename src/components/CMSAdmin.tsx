import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { DietaryType, MenuItem } from '../types';
import {
  X,
  PlusCircle,
  Megaphone,
  CalendarCheck,
  Coffee,
  RotateCcw,
  Trash2,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

export const CMSAdmin: React.FC = () => {
  const {
    isCMSOpen,
    setIsCMSOpen,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleStock,
    resetMenuToDefault,
    announcement,
    updateAnnouncement,
    reservations,
    updateReservationStatus,
    reviews,
    deleteReview,
    triggerCMSNotice,
  } = useCafe();

  const [activeTab, setActiveTab] = useState<'dishes' | 'new-dish' | 'announcements' | 'reservations' | 'reviews'>('dishes');

  // New Dish Form State
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState('Specialty Brews');
  const [dishPrice, setDishPrice] = useState(240);
  const [dishDietary, setDishDietary] = useState<DietaryType>('veg');
  const [dishDescription, setDishDescription] = useState('');
  const [dishImage, setDishImage] = useState('/src/assets/images/coffee_specialty_brew_1793944936064.jpg');
  const [dishPrepTime, setDishPrepTime] = useState(10);
  const [dishIsSeasonal, setDishIsSeasonal] = useState(true);
  const [dishIsChefSpecial, setDishIsChefSpecial] = useState(false);
  const [dishTag, setDishTag] = useState('Seasonal Special');

  // Announcement Form State
  const [annBadge, setAnnBadge] = useState(announcement.badge);
  const [annHeadline, setAnnHeadline] = useState(announcement.headline);
  const [annSubtext, setAnnSubtext] = useState(announcement.subtext);
  const [annIsActive, setAnnIsActive] = useState(announcement.isActive);
  const [annActionText, setAnnActionText] = useState(announcement.actionText || 'Taste Specials');

  if (!isCMSOpen) return null;

  const handlePushDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim() || !dishDescription.trim()) return;

    addMenuItem({
      name: dishName.trim(),
      category: dishCategory,
      price: Number(dishPrice),
      dietary: dishDietary,
      description: dishDescription.trim(),
      image: dishImage,
      prepTimeMinutes: Number(dishPrepTime),
      isSeasonal: dishIsSeasonal,
      isChefSpecial: dishIsChefSpecial,
      inStock: true,
      tags: [dishTag.trim() || 'New Arrival'],
    });

    // Reset form and return to dishes list
    setDishName('');
    setDishDescription('');
    setActiveTab('dishes');
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      badge: annBadge,
      headline: annHeadline,
      subtext: annSubtext,
      isActive: annIsActive,
      actionText: annActionText,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0A1420] border border-[#334A65] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#0E1B2B] border-b border-[#1E2E42] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C89B3C]/20 border border-[#C89B3C]/40 flex items-center justify-center text-[#F5C249]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">Captain's Bridge CMS</h3>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">Content Management System for The Captain's Cafe</p>
            </div>
          </div>

          <button
            onClick={() => setIsCMSOpen(false)}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1E2E42] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CMS Tabs Bar */}
        <div className="px-6 pt-3 border-b border-[#1E2E42] bg-[#0E1B2B] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'dishes'
                ? 'bg-[#153450] text-[#F5C249] border-[#C89B3C]'
                : 'text-[#94A3B8] hover:text-white border-transparent'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Menu Catalog ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new-dish')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'new-dish'
                ? 'bg-[#153450] text-[#F5C249] border-[#C89B3C]'
                : 'text-[#94A3B8] hover:text-white border-transparent'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Push New Dish / Seasonal</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'announcements'
                ? 'bg-[#153450] text-[#F5C249] border-[#C89B3C]'
                : 'text-[#94A3B8] hover:text-white border-transparent'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Seasonal Announcements</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reservations'
                ? 'bg-[#153450] text-[#F5C249] border-[#C89B3C]'
                : 'text-[#94A3B8] hover:text-white border-transparent'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Table Reservations ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'bg-[#153450] text-[#F5C249] border-[#C89B3C]'
                : 'text-[#94A3B8] hover:text-white border-transparent'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Guest Reviews ({reviews.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: MANAGE EXISTING DISHES */}
          {activeTab === 'dishes' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Menu Dishes</h4>
                  <p className="text-xs text-[#94A3B8]">
                    Toggle in-stock status, adjust pricing, or remove dishes. All modifications update the customer site immediately.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('new-dish')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C89B3C] text-[#0B1522] text-xs font-bold hover:bg-[#D4AF37]"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add New Dish</span>
                  </button>
                  <button
                    onClick={resetMenuToDefault}
                    title="Reset to default seed dishes"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#122338] border border-[#243B55] text-xs text-[#94A3B8] hover:text-white hover:border-[#C89B3C]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Dishes Table */}
              <div className="rounded-2xl border border-[#1E2E42] overflow-hidden bg-[#0E1B2B]">
                <table className="w-full text-left text-xs text-[#CBD5E1]">
                  <thead className="bg-[#122338] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E2E42]">
                    <tr>
                      <th className="px-4 py-3">Dish / Item</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Dietary</th>
                      <th className="px-4 py-3">Stock Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2E42]">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[#122338]/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover bg-[#0B1522] shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-white">{item.name}</p>
                              {item.isSeasonal && (
                                <span className="text-[10px] text-[#F5C249] font-medium">★ Seasonal</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#94A3B8]">{item.category}</td>
                        <td className="px-4 py-3 font-semibold text-[#F5C249] tabular-nums">
                          ₹{item.price}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded ${
                              item.dietary === 'veg'
                                ? 'bg-emerald-950 text-emerald-300'
                                : item.dietary === 'vegan'
                                ? 'bg-teal-950 text-teal-300'
                                : 'bg-red-950 text-red-300'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {item.dietary}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleStock(item.id)}
                            className="flex items-center gap-1.5 text-xs"
                          >
                            {item.inStock ? (
                              <>
                                <ToggleRight className="w-5 h-5 text-emerald-400" />
                                <span className="text-emerald-400 font-medium">In Stock</span>
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-5 h-5 text-red-400" />
                                <span className="text-red-400 font-medium">Sold Out</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => deleteMenuItem(item.id)}
                            className="p-1.5 text-[#64748B] hover:text-red-400 transition-colors"
                            title="Delete dish from menu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PUSH NEW DISH / SEASONAL */}
          {activeTab === 'new-dish' && (
            <div className="max-w-2xl mx-auto bg-[#122338] border border-[#1E2E42] rounded-2xl p-6 sm:p-8 space-y-5">
              <div>
                <h4 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#F5C249]" />
                  <span>Push New Dish or Seasonal Special</span>
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Pushes instantly to the customer menu, search index, and digital order tray.
                </p>
              </div>

              <form onSubmit={handlePushDish} className="space-y-4">
                
                {/* Dish Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cardamom Rose Pistachio Latte / Smoked BBQ Pulled Sourdough"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                {/* Category & Dietary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                      Menu Category
                    </label>
                    <select
                      value={dishCategory}
                      onChange={(e) => setDishCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                    >
                      <option value="Specialty Brews">Specialty Brews</option>
                      <option value="Burgers & Sandwiches">Burgers & Sandwiches</option>
                      <option value="Stone-Baked Pizzas">Stone-Baked Pizzas</option>
                      <option value="Pastas & Mains">Pastas & Mains</option>
                      <option value="Signature Beverages">Signature Beverages</option>
                      <option value="Desserts & Bakes">Desserts & Bakes</option>
                      <option value="Quick Bites & Platters">Quick Bites & Platters</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                      Dietary Tag
                    </label>
                    <select
                      value={dishDietary}
                      onChange={(e) => setDishDietary(e.target.value as DietaryType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                    >
                      <option value="veg">Pure Veg (Green)</option>
                      <option value="non-veg">Non-Veg (Red)</option>
                      <option value="vegan">Vegan Plant-Based</option>
                    </select>
                  </div>
                </div>

                {/* Price & Prep Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                      Price in INR (₹) *
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={2000}
                      value={dishPrice}
                      onChange={(e) => setDishPrice(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                      Estimated Prep Time (Mins)
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={60}
                      value={dishPrepTime}
                      onChange={(e) => setDishPrepTime(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Dish Description & Flavor Notes *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the aroma, ingredients, preparation, and pairing notes..."
                    value={dishDescription}
                    onChange={(e) => setDishDescription(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                {/* Image Selection Presets */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Select Photography Asset
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      {
                        name: 'Specialty Coffee',
                        path: '/src/assets/images/coffee_specialty_brew_1793944936064.jpg',
                      },
                      {
                        name: 'Blueberry Bake',
                        path: '/src/assets/images/dish_blueberry_cheesecake_1793944937117.jpg',
                      },
                      {
                        name: 'Brioche Burger',
                        path: '/src/assets/images/dish_signature_burger_1793944936132.jpg',
                      },
                      {
                        name: 'Cafe Ambiance',
                        path: '/src/assets/images/hero_captains_cafe_1793944935685.jpg',
                      },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setDishImage(preset.path)}
                        className={`p-1.5 rounded-xl border text-left transition-all ${
                          dishImage === preset.path
                            ? 'border-[#C89B3C] bg-[#153450]'
                            : 'border-[#1E2E42] bg-[#0B1522] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.path}
                          alt={preset.name}
                          className="w-full aspect-[4/3] object-cover rounded-lg"
                        />
                        <p className="text-[10px] text-white font-medium mt-1 truncate">{preset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags & Flags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                      Promotional Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Monsoon Special, Chef's Secret"
                      value={dishTag}
                      onChange={(e) => setDishTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                      <input
                        type="checkbox"
                        checked={dishIsSeasonal}
                        onChange={(e) => setDishIsSeasonal(e.target.checked)}
                        className="rounded border-[#243B55] text-[#C89B3C] focus:ring-0"
                      />
                      <span>Mark as Seasonal</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                      <input
                        type="checkbox"
                        checked={dishIsChefSpecial}
                        onChange={(e) => setDishIsChefSpecial(e.target.checked)}
                        className="rounded border-[#243B55] text-[#C89B3C] focus:ring-0"
                      />
                      <span>Chef's Special</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('dishes')}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] text-xs font-bold shadow-lg transition-all"
                  >
                    🚀 Publish Dish to Live Menu
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 3: SEASONAL ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="max-w-2xl mx-auto bg-[#122338] border border-[#1E2E42] rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-[#F5C249]" />
                  <span>Top Broadcast Announcement Banner</span>
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Displays at the very top of The Captain's Cafe website for seasonal festivals, new brews, or live acoustic nights.
                </p>
              </div>

              <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                
                {/* Active switch */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0B1522] border border-[#243B55]">
                  <div>
                    <p className="text-xs font-semibold text-white">Broadcast Banner Visibility</p>
                    <p className="text-[11px] text-[#94A3B8]">Show banner at the top of all pages</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnnIsActive(!annIsActive)}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    {annIsActive ? (
                      <ToggleRight className="w-7 h-7 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-7 h-7 text-red-400" />
                    )}
                  </button>
                </div>

                {/* Badge text */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Kicker Badge Text
                  </label>
                  <input
                    type="text"
                    value={annBadge}
                    onChange={(e) => setAnnBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                {/* Headline */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Announcement Headline *
                  </label>
                  <input
                    type="text"
                    value={annHeadline}
                    onChange={(e) => setAnnHeadline(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                {/* Subtext */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Subtext / Details
                  </label>
                  <textarea
                    rows={2}
                    value={annSubtext}
                    onChange={(e) => setAnnSubtext(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                {/* Action CTA Text */}
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] uppercase mb-1">
                    Button Action Text
                  </label>
                  <input
                    type="text"
                    value={annActionText}
                    onChange={(e) => setAnnActionText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1522] border border-[#243B55] text-white text-xs focus:outline-none focus:border-[#C89B3C]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C89B3C] hover:bg-[#D4AF37] text-[#0B1522] text-xs font-bold shadow-md transition-all"
                  >
                    Save & Broadcast Live
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 4: RESERVATIONS LOG */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Guest Table Reservations</h4>
                <p className="text-xs text-[#94A3B8]">
                  Incoming bookings from both Nayapalli and Saheed Nagar outlets.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1E2E42] overflow-hidden bg-[#0E1B2B]">
                <table className="w-full text-left text-xs text-[#CBD5E1]">
                  <thead className="bg-[#122338] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E2E42]">
                    <tr>
                      <th className="px-4 py-3">Booking ID</th>
                      <th className="px-4 py-3">Guest</th>
                      <th className="px-4 py-3">Outlet & Zone</th>
                      <th className="px-4 py-3">Date & Time</th>
                      <th className="px-4 py-3">Party Size</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2E42]">
                    {reservations.map((r) => (
                      <tr key={r.id} className="hover:bg-[#122338]/60 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-[#F5C249]">{r.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-white">{r.guestName}</p>
                          <p className="text-[11px] text-[#94A3B8]">{r.phone}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white">{r.outlet.split(' ')[0]}</p>
                          <p className="text-[11px] text-[#94A3B8] truncate max-w-xs">{r.zone}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white">{r.date}</p>
                          <p className="text-[11px] text-[#94A3B8]">{r.timeSlot.split(' ')[0]}</p>
                        </td>
                        <td className="px-4 py-3 tabular-nums font-medium text-white">
                          {r.guestsCount} guests
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                              r.status === 'Confirmed'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : r.status === 'Seated'
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-red-950 text-red-400 border border-red-800'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-1">
                          {r.status !== 'Seated' && (
                            <button
                              onClick={() => updateReservationStatus(r.id, 'Seated')}
                              className="px-2 py-1 rounded bg-[#122338] hover:bg-[#1E2E42] text-[10px] text-emerald-400 font-semibold border border-[#243B55]"
                            >
                              Seat Table
                            </button>
                          )}
                          {r.status !== 'Cancelled' && (
                            <button
                              onClick={() => updateReservationStatus(r.id, 'Cancelled')}
                              className="px-2 py-1 rounded bg-[#122338] hover:bg-[#1E2E42] text-[10px] text-red-400 font-semibold border border-[#243B55]"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Customer Reviews Moderation</h4>
                <p className="text-xs text-[#94A3B8]">
                  Manage reviews displayed on the main website.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-[#122338] border border-[#1E2E42] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">{rev.authorName}</span>
                        <span className="text-[#F5C249] text-xs">★ {rev.rating}</span>
                      </div>
                      <p className="text-xs text-[#CBD5E1] mt-2 italic">"{rev.comment}"</p>
                      {rev.dishRecommended && (
                        <p className="text-[11px] text-[#C89B3C] mt-1">
                          Recommended: {rev.dishRecommended}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1E2E42] text-[11px] text-[#94A3B8]">
                      <span>{rev.date}</span>
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="text-red-400 hover:underline"
                      >
                        Remove from site
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0E1B2B] border-t border-[#1E2E42] flex items-center justify-between text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Changes persist immediately to localStorage & live site.</span>
          </div>
          <button
            onClick={() => setIsCMSOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-[#C89B3C] text-[#0B1522] font-bold text-xs hover:bg-[#D4AF37]"
          >
            Done & Return to Site
          </button>
        </div>

      </div>
    </div>
  );
};
