import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  Reservation,
  Review,
  GalleryItem,
  Announcement,
  LoyaltyMember,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_RESERVATIONS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_ANNOUNCEMENT,
  INITIAL_LOYALTY,
} from '../data/initialData';

interface CafeContextType {
  // Menu
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleStock: (id: string) => void;
  resetMenuToDefault: () => void;

  // Cart / Table Order Tray
  cart: CartItem[];
  addToCart: (item: MenuItem, customization?: CartItem['customization']) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  cartGst: number;
  cartTotal: number;

  // Reservations
  reservations: Reservation[];
  addReservation: (res: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => Reservation;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (rev: Omit<Review, 'id' | 'date' | 'verifiedDiner'>) => void;
  deleteReview: (id: string) => void;

  // Announcements
  announcement: Announcement;
  updateAnnouncement: (ann: Partial<Announcement>) => void;

  // Gallery
  gallery: GalleryItem[];
  toggleLikeGallery: (id: string) => void;

  // Loyalty
  loyalty: LoyaltyMember;
  addStamp: () => void;
  redeemLoyaltyReward: (perkName: string) => boolean;

  // CMS Toggle & Mode
  isCMSOpen: boolean;
  setIsCMSOpen: (open: boolean) => void;
  cmsNotice: string | null;
  triggerCMSNotice: (msg: string) => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Menu Items State
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('captains_cafe_menu_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached menu', e);
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('captains_cafe_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached cart', e);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reservations State
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('captains_cafe_reservations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached reservations', e);
      }
    }
    return INITIAL_RESERVATIONS;
  });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('captains_cafe_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached reviews', e);
      }
    }
    return INITIAL_REVIEWS;
  });

  // Announcement State
  const [announcement, setAnnouncement] = useState<Announcement>(() => {
    const saved = localStorage.getItem('captains_cafe_announcement');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached announcement', e);
      }
    }
    return INITIAL_ANNOUNCEMENT;
  });

  // Gallery State
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('captains_cafe_gallery');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached gallery', e);
      }
    }
    return INITIAL_GALLERY;
  });

  // Loyalty Member State
  const [loyalty, setLoyalty] = useState<LoyaltyMember>(() => {
    const saved = localStorage.getItem('captains_cafe_loyalty');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached loyalty', e);
      }
    }
    return INITIAL_LOYALTY;
  });

  // CMS modal state
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [cmsNotice, setCmsNotice] = useState<string | null>(null);

  const triggerCMSNotice = (msg: string) => {
    setCmsNotice(msg);
    setTimeout(() => {
      setCmsNotice(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('captains_cafe_menu_v2', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('captains_cafe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('captains_cafe_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('captains_cafe_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('captains_cafe_announcement', JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem('captains_cafe_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('captains_cafe_loyalty', JSON.stringify(loyalty));
  }, [loyalty]);

  // Menu Handlers
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `cpt-custom-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    triggerCMSNotice(`Pushed new dish: "${newItem.name}" to live menu`);
  };

  const updateMenuItem = (id: string, updatedFields: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    triggerCMSNotice(`Updated menu dish item.`);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    triggerCMSNotice(`Dish removed from menu.`);
  };

  const toggleStock = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  const resetMenuToDefault = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    triggerCMSNotice(`Menu reset to Captain’s default flagship catalog.`);
  };

  // Cart Handlers
  const addToCart = (item: MenuItem, customization?: CartItem['customization']) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [...prev, { item, quantity: 1, customization }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartSubtotal = cart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const cartGst = Math.round(cartSubtotal * 0.05);
  const cartTotal = cartSubtotal + cartGst;

  // Reservation Handlers
  const addReservation = (
    resData: Omit<Reservation, 'id' | 'status' | 'createdAt'>
  ): Reservation => {
    const newReservation: Reservation = {
      ...resData,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    triggerCMSNotice(`Reservation #${id} status changed to ${status}.`);
  };

  // Review Handlers
  const addReview = (revData: Omit<Review, 'id' | 'date' | 'verifiedDiner'>) => {
    const newReview: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedDiner: true,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    triggerCMSNotice(`Review removed from moderation queue.`);
  };

  // Announcement Handlers
  const updateAnnouncement = (partial: Partial<Announcement>) => {
    setAnnouncement((prev) => ({ ...prev, ...partial }));
    triggerCMSNotice(`Broadcast announcement updated across the cafe website.`);
  };

  // Gallery Like
  const toggleLikeGallery = (id: string) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, likes: g.likes + 1 } : g))
    );
  };

  // Loyalty Handlers
  const addStamp = () => {
    setLoyalty((prev) => {
      const nextStamps = prev.stampsCollected + 1;
      const isFree = nextStamps >= 6;
      const addedPoints = prev.points + 25;
      let newTier = prev.tier;
      if (addedPoints >= 1000) newTier = 'Captain';
      else if (addedPoints >= 500) newTier = 'Quartermaster';
      else if (addedPoints >= 200) newTier = 'First Mate';

      return {
        ...prev,
        stampsCollected: nextStamps % 6,
        points: addedPoints,
        freeRewardAvailable: isFree || prev.freeRewardAvailable,
        tier: newTier,
      };
    });
  };

  const redeemLoyaltyReward = (perkName: string) => {
    if (loyalty.points >= 150 || loyalty.freeRewardAvailable) {
      setLoyalty((prev) => ({
        ...prev,
        points: Math.max(0, prev.points - 150),
        freeRewardAvailable: false,
      }));
      triggerCMSNotice(`Redeemed Perk: "${perkName}" successfully!`);
      return true;
    }
    return false;
  };

  return (
    <CafeContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleStock,
        resetMenuToDefault,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartSubtotal,
        cartGst,
        cartTotal,
        reservations,
        addReservation,
        updateReservationStatus,
        reviews,
        addReview,
        deleteReview,
        announcement,
        updateAnnouncement,
        gallery,
        toggleLikeGallery,
        loyalty,
        addStamp,
        redeemLoyaltyReward,
        isCMSOpen,
        setIsCMSOpen,
        cmsNotice,
        triggerCMSNotice,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
