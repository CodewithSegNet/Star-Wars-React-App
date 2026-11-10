import React, { useEffect, useState } from 'react';
import { getCharacters } from '../api/swapi';
import type { Character } from '../types';
import CharacterCard from './CharacterCard';
import '../styles/CharacterList.css';

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCharacters(page)
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch(() => setError('Failed to load characters. Please try again.'))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="character-list">
      <h1 className="character-list__title">Star Wars Characters</h1>

      {loading && (
        <div className="character-list__loading">
          <div className="spinner" />
          <p>Loading characters...</p>
        </div>
      )}

      {error && <p className="character-list__error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="character-list__grid">
            {characters.map((char) => (
              <CharacterCard key={char.url} character={char} />
            ))}
          </div>

          <div className="character-list__pagination">
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Prev
            </button>
            <span className="pagination-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList;
