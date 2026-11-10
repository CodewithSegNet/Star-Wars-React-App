import { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';
import type { FavouritesContextValue } from '../context/FavouritesContext';

export const useFavourites = (): FavouritesContextValue => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavourites must be used within FavouritesProvider');
  return ctx;
};

