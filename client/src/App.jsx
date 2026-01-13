import React, { useState } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (description) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch('http://localhost:3000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      if (data.success) {
        setMovies(data.movies);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>AI Movie Recommender</h1>
        <p className="subtitle">Discover your next favorite film with the power of AI</p>
      </header>

      <MovieForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <div style={{ color: '#ff4d4d', marginTop: '1rem' }}>{error}</div>}

      <MovieList movies={movies} />
    </div>
  );
}

export default App;
