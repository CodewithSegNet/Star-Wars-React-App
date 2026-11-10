import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCharacters } from '../api/swapi';
import type { Character } from '../types';
import CharacterCard from './CharacterCard';
import '../styles/SearchResults.css';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setCharacters([]);
      return;
    }
    setLoading(true);
    setError(null);
    searchCharacters(query)
      .then((data) => setCharacters(data.results))
      .catch(() => setError('Search failed. Please try again.'))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-results">
      <h1 className="search-results__title">
        {query ? (
          <>
            Results for <em>&ldquo;{query}&rdquo;</em>
          </>
        ) : (
          'Search Characters'
        )}
      </h1>

      {loading && (
        <div className="search-results__loading">
          <div className="spinner" />
          <p>Searching...</p>
        </div>
      )}

      {error && <p className="search-results__error">{error}</p>}

      {!loading && !error && characters.length === 0 && query && (
        <p className="search-results__empty">
          No characters found matching &ldquo;{query}&rdquo;.
        </p>
      )}

      {!loading && !error && characters.length > 0 && (
        <div className="search-results__grid">
          {characters.map((char) => (
            <CharacterCard key={char.url} character={char} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
