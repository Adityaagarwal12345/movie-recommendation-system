import React from 'react';

const MovieList = ({ movies }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="movie-grid">
            {movies.map((movie, index) => (
                <div key={index} className="movie-card" style={{ animation: `fadeIn 0.5s ease forwards ${index * 0.1}s`, opacity: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{movie.title}</h3>
                        <span className="rating">★ {movie.rating}</span>
                    </div>
                    <span className="year">{movie.year}</span>
                    <p>{movie.description}</p>
                </div>
            ))}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default MovieList;
