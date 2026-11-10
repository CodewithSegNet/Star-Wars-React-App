import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Favourite } from '../types';

interface FavouritesContextValue {
  favourites: Favourite[];
  addFavourite: (fav: Favourite) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

const STORAGE_KEY = 'sw_favourites';

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<Favourite[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = useCallback((fav: Favourite) => {
    setFavourites((prev) => (prev.find((f) => f.id === fav.id) ? prev : [...prev, fav]));
  }, []);

  const removeFavourite = useCallback((id: string) => {
    setFavourites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavourite = useCallback(
    (id: string) => favourites.some((f) => f.id === id),
    [favourites]
  );

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = (): FavouritesContextValue => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavourites must be used within FavouritesProvider');
  return ctx;
};
