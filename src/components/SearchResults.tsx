import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchCharacters } from '../api/swapi';
import type { Character } from '../types';
import CharacterCard from './CharacterCard';
import '../styles/SearchResults.css';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [fetchedQuery, setFetchedQuery] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  // loading when a non-empty query hasn't resolved yet
  const loading = query.trim() !== '' && query !== fetchedQuery;

  useEffect(() => {
    if (!query.trim()) {
      // No setState here — loading is derived, idle state is handled by render
      return;
    }
    let cancelled = false;
    searchCharacters(query)
      .then((data) => {
        if (cancelled) return;
        setCharacters(data.results);
        setError(null);
        setFetchedQuery(query);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Search failed. Please try again.');
        setFetchedQuery(query);
      });
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="search-results">
      <h1 className="search-results__title">
        {query
          ? <>Results for <em>&ldquo;{query}&rdquo;</em></>
          : 'Search Characters'}
      </h1>

      {loading && (
        <div className="search-results__loading">
          <div className="spinner" />
          <p>Searching...</p>
        </div>
      )}

      {!loading && error && (
        <p className="search-results__error">{error}</p>
      )}

      {!loading && !error && characters.length === 0 && query && (
        <p className="search-results__empty">No characters found matching &ldquo;{query}&rdquo;.</p>
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
