import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const HISTORY_KEY = 'sw_search_history';
const MAX_HISTORY = 10;

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist history
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const saveToHistory = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const filtered = prev.filter((h) => h !== trimmed);
      return [trimmed, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(val.trim().length === 0 && history.length > 0);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length > 0) {
      debounceRef.current = setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(val.trim())}`);
      }, 400);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      saveToHistory(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
    if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    if (query.trim().length === 0 && history.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on dropdown items
    setTimeout(() => setShowDropdown(false), 150);
  };

  const selectHistoryItem = (term: string) => {
    setQuery(term);
    setShowDropdown(false);
    saveToHistory(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const filteredHistory = query.trim()
    ? history.filter((h) => h.toLowerCase().includes(query.toLowerCase()))
    : history;

  return (
    <header className="header">
      <a href="/" className="header__logo">
        <span className="header__logo-text">⭐ Star Wars</span>
      </a>
      <div className="header__search-wrapper">
        <div className="header__search-icon">🔍</div>
        <input
          ref={inputRef}
          className="header__search-input"
          type="text"
          placeholder="Search characters..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search characters"
        />
        {query && (
          <button
            className="header__search-clear"
            onClick={() => {
              setQuery('');
              setShowDropdown(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        {showDropdown && filteredHistory.length > 0 && (
          <ul className="header__search-dropdown" role="listbox">
            {filteredHistory.map((term, i) => (
              <li
                key={i}
                className="header__search-dropdown-item"
                role="option"
                onMouseDown={() => selectHistoryItem(term)}
              >
                <span className="header__history-icon">🕐</span>
                {term}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
