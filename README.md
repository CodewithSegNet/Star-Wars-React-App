# Star Wars Characters App

A React application that lets you explore characters from the Star Wars universe using the [SWAPI](https://swapi.dev/) public API.

## Features

- **Homepage** — Paginated grid of all Star Wars characters (10 per page)
- **Character Detail** — Full profile including height, mass, gender, birth year, home planet, film appearances, and starships
- **Search** — Live search that triggers automatically as you type (debounced, 400 ms), with results shown in real time
- **Search History** — Autocomplete dropdown populated from your past searches, persisted across page reloads
- **Favourites Sidebar** — Star any character to save them; the list persists via `localStorage` and each entry links directly to that character's detail page
- **Responsive Design** — Sidebar hidden on mobile; grid adapts to screen width

## Tech Stack

| Tool                                          | Purpose                                      |
| --------------------------------------------- | -------------------------------------------- |
| [React 19](https://react.dev/)                | UI library (functional components + hooks)   |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                                  |
| [React Router v7](https://reactrouter.com/)   | Client-side routing                          |
| [Axios](https://axios-http.com/)              | HTTP client for SWAPI requests               |
| [Vite](https://vitejs.dev/)                   | Build tool and dev server                    |
| CSS                                           | Component-scoped stylesheets (no UI library) |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/CodewithSegNet/Star-Wars-React-App.git
cd star-wars-react-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script            | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the development server with HMR |
| `npm run build`   | Type-check and build for production   |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`    | Run ESLint across the whole project   |

## Project Structure

```
src/
├── api/
│   └── swapi.ts               # Axios client — getCharacters, searchCharacters, getFilm, getPlanet
├── assets/
│   └── star-wars-seeklogo.svg # Logo (imported as an ES module)
├── components/
│   ├── CharacterCard.tsx      # Card shown in list/search grids with inline ★ favourite toggle
│   ├── CharacterDetail.tsx    # Full character profile page
│   ├── CharacterList.tsx      # Homepage — paginated character grid
│   ├── Header.tsx             # Fixed top bar with logo and live search input
│   ├── SearchResults.tsx      # Search results page (auto-triggered on input)
│   └── Sidebar.tsx            # Persistent favourites list
├── context/
│   ├── FavouritesContext.ts   # createContext + types (plain .ts, no JSX)
│   └── FavouritesContext.tsx  # FavouritesProvider component
├── hooks/
│   └── useFavourites.ts       # useFavourites() — consumes FavouritesContext
├── styles/
│   ├── index.css              # Global reset, CSS variables, spinner
│   ├── App.css                # App shell layout
│   ├── Header.css
│   ├── Sidebar.css
│   ├── CharacterCard.css
│   ├── CharacterList.css
│   ├── CharacterDetail.css
│   └── SearchResults.css
├── types/
│   └── index.ts               # Shared TypeScript types (Character, Film, Planet, Favourite…)
├── App.tsx                    # Root component — BrowserRouter + route definitions
└── main.tsx                   # Entry point
```

## Pages & Routes

| Route            | Component         | Description                         |
| ---------------- | ----------------- | ----------------------------------- |
| `/`              | `CharacterList`   | Paginated character grid            |
| `/character/:id` | `CharacterDetail` | Character detail + favourite toggle |
| `/search?q=…`    | `SearchResults`   | Live search results                 |

## API

All data is fetched from [https://swapi.dev/api](https://swapi.dev/api).

| Function                  | Endpoint                                        |
| ------------------------- | ----------------------------------------------- |
| `getCharacters(page)`     | `GET /people/?page=n`                           |
| `getCharacterById(id)`    | `GET /people/:id/`                              |
| `searchCharacters(query)` | `GET /people/?search=query`                     |
| `getPlanet(url)`          | Absolute URL from character's `homeworld` field |
| `getFilm(url)`            | Absolute URL from character's `films` array     |

## LocalStorage Keys

| Key                 | Contents                                |
| ------------------- | --------------------------------------- |
| `sw_favourites`     | Array of `{ id, name, url }` objects    |
| `sw_search_history` | Array of recent search strings (max 10) |

## License

MIT
