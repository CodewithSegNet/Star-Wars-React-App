import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById, getPlanet, getFilm, extractId } from '../api/swapi';
import { useFavourites } from '../hooks/useFavourites';
import type { Character, Planet, Film } from '../types';
import '../styles/CharacterDetail.css';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  const [character, setCharacter] = useState<Character | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setFilms([]);
    setPlanet(null);

    getCharacterById(id)
      .then(async (char) => {
        setCharacter(char);
        // Fetch planet and films in parallel
        const [planetData, filmsData] = await Promise.all([
          getPlanet(char.homeworld),
          Promise.all(char.films.map(getFilm)),
        ]);
        setPlanet(planetData);
        setFilms(filmsData.sort((a, b) => a.episode_id - b.episode_id));
      })
      .catch(() => setError('Failed to load character details.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="character-detail__loading">
        <div className="spinner" />
        <p>Loading character...</p>
      </div>
    );

  if (error) return <p className="character-detail__error">{error}</p>;
  if (!character || !id) return null;

  const fav = isFavourite(id);

  const toggleFav = () => {
    if (fav) {
      removeFavourite(id);
    } else {
      addFavourite({ id, name: character.name, url: character.url });
    }
  };

  const detailRows: [string, string][] = [
    ['Height', character.height !== 'unknown' ? `${character.height} cm` : 'Unknown'],
    ['Mass', character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown'],
    ['Hair Color', character.hair_color],
    ['Skin Color', character.skin_color],
    ['Eye Color', character.eye_color],
    ['Birth Year', character.birth_year],
    ['Gender', character.gender],
  ];

  return (
    <div className="character-detail">
      <button className="character-detail__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="character-detail__header">
        <div className="character-detail__avatar">
          {character.name.charAt(0).toUpperCase()}
        </div>
        <div className="character-detail__header-info">
          <h1 className="character-detail__name">{character.name}</h1>
          <button
            className={`character-detail__fav-btn ${fav ? 'character-detail__fav-btn--active' : ''}`}
            onClick={toggleFav}
            aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
          >
            {fav ? '★ Remove from Favourites' : '☆ Add to Favourites'}
          </button>
        </div>
      </div>

      <div className="character-detail__body">
        <section className="character-detail__section">
          <h2 className="character-detail__section-title">Personal Info</h2>
          <dl className="character-detail__dl">
            {detailRows.map(([label, value]) => (
              <React.Fragment key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        {planet && (
          <section className="character-detail__section">
            <h2 className="character-detail__section-title">Home Planet</h2>
            <dl className="character-detail__dl">
              <dt>Name</dt><dd>{planet.name}</dd>
              <dt>Climate</dt><dd>{planet.climate}</dd>
              <dt>Terrain</dt><dd>{planet.terrain}</dd>
              <dt>Population</dt><dd>{planet.population}</dd>
              <dt>Diameter</dt><dd>{planet.diameter} km</dd>
            </dl>
          </section>
        )}

        {films.length > 0 && (
          <section className="character-detail__section">
            <h2 className="character-detail__section-title">Appearances</h2>
            <ul className="character-detail__films">
              {films.map((film) => (
                <li key={film.url} className="character-detail__film-item">
                  <span className="character-detail__film-episode">
                    Episode {film.episode_id}
                  </span>
                  <span className="character-detail__film-title">{film.title}</span>
                  <span className="character-detail__film-year">
                    {film.release_date.split('-')[0]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {character.starships.length > 0 && (
          <section className="character-detail__section">
            <h2 className="character-detail__section-title">Starships</h2>
            <ul className="character-detail__tags">
              {character.starships.map((url) => (
                <li key={url} className="character-detail__tag">
                  #{extractId(url)}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;

