# Star Wars Characters App

A React-based web application that fetches and displays characters from the Star Wars universe using the Star Wars API (SWAPI).

## Features

- **Character Grid**: Displays Star Wars characters in a grid layout with their name and birth year.
- **Detailed View**: Shows detailed information about a selected character, including:
  - Name
  - Height
  - Mass
  - Hair color
  - Skin color
  - Eye color
  - Birth year
  - Gender
  - Home Planet (with link to planet details)
- **Planet Details**: Displays detailed information about a character's home planet.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd star-wars-react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Project Structure

```
src/
├── api/              # API configuration and utility functions
│   └── swapi.ts
├── components/       # React components
│   ├── CharacterCard.tsx
│   ├── CharacterDetail.tsx
│   ├── CharacterList.tsx
│   ├── PlanetDetail.tsx
│   └── App.tsx
├── styles/           # Global styles
│   ├── App.css
│   └── index.css
├── types/            # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main application component
├── main.tsx          # Entry point
└── vite.config.ts    # Vite configuration
```

## Technologies Used

- **React**: UI library for building the user interface
- **TypeScript**: For type safety
- **Vite**: Build tool and development server
- **Axios**: HTTP client for API requests

## License

This project is licensed under the MIT License.
