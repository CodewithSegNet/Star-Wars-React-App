import React from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../hooks/useFavourites';
import type { Favourite } from '../types';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">
        Favourites
      </h2>
      {favourites.length === 0 ? (
        <p className="sidebar__empty">No favourites yet. Click the star on a character to add them!</p>
      ) : (
        <ul className="sidebar__list">
          {favourites.map((fav: Favourite) => (
            <li key={fav.id} className="sidebar__item">
              <Link to={`/character/${fav.id}`} className="sidebar__link">
                {fav.name}
              </Link>
              <button
                className="sidebar__remove-btn"
                onClick={() => removeFavourite(fav.id)}
                aria-label={`Remove ${fav.name} from favourites`}
                title="Remove from favourites"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;

