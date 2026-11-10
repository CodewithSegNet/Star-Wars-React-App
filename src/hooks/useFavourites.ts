import { useContext } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
import { FavouritesContext } from '../context/FavouritesContext.tsx';
import type { FavouritesContextValue } from '../context/FavouritesContext.tsx';

export const useFavourites = (): FavouritesContextValue => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error('useFavourites must be used within FavouritesProvider');
  return ctx;
};
