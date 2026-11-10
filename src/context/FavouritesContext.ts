import { createContext } from 'react';
import type { Favourite } from '../types';

export interface FavouritesContextValue {
  favourites: Favourite[];
  addFavourite: (fav: Favourite) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
}

export const FavouritesContext = createContext<FavouritesContextValue | null>(null);

export const STORAGE_KEY = 'sw_favourites';

