import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import SearchResults from './components/SearchResults';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <FavouritesProvider>
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />
            <main className="app__main">
              <Routes>
                <Route path="/" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </main>
          </div>
        </div>
      </FavouritesProvider>
    </BrowserRouter>
  );
}

export default App;
