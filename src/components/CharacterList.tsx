import React, { useEffect, useState } from 'react';
import { getCharacters } from '../api/swapi';
import type { Character } from '../types';
import CharacterCard from './CharacterCard';
import '../styles/CharacterList.css';

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  // Track the page for which we last received a response (success or error).
  // loading is true when page !== fetchedPage (a fetch is in-flight).
  const [fetchedPage, setFetchedPage] = useState(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const loading = page !== fetchedPage;

  useEffect(() => {
    let cancelled = false;
    getCharacters(page)
      .then((data) => {
        if (cancelled) return;
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setError(null);
        setFetchedPage(page);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Failed to load characters. Please try again.');
        setFetchedPage(page);
      });
    return () => { cancelled = true; };
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

      {!loading && error && (
        <p className="character-list__error">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="character-list__grid">
            {characters.map((char) => (
              <CharacterCard key={char.url} character={char} />
            ))}
          </div>
          <div className="character-list__pagination">
            <button className="pagination-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              ← Prev
            </button>
            <span className="pagination-info">Page {page} of {totalPages}</span>
            <button className="pagination-btn" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList;
