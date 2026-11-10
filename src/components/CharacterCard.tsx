import React from 'react';
import { Link } from 'react-router-dom';
import { extractId } from '../api/swapi';
import { useFavourites } from '../context/FavouritesContext';
import type { Character } from '../types';
import '../styles/CharacterCard.css';

interface Props {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
  const id = extractId(character.url);
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(id);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fav) {
      removeFavourite(id);
    } else {
      addFavourite({ id, name: character.name, url: character.url });
    }
  };

  return (
    <Link to={`/character/${id}`} className="character-card">
      <div className="character-card__avatar">
        {character.name.charAt(0).toUpperCase()}
      </div>
      <div className="character-card__body">
        <h3 className="character-card__name">{character.name}</h3>
        <ul className="character-card__meta">
          <li>
            <span className="character-card__label">Born:</span> {character.birth_year}
          </li>
          <li>
            <span className="character-card__label">Gender:</span> {character.gender}
          </li>
        </ul>
      </div>
      <button
        className={`character-card__fav-btn ${fav ? 'character-card__fav-btn--active' : ''}`}
        onClick={toggleFav}
        aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        title={fav ? 'Remove from favourites' : 'Add to favourites'}
      >
        {fav ? '★' : '☆'}
      </button>
    </Link>
  );
};

export default CharacterCard;
