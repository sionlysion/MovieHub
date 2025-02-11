import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../../api/tmdb';
import MovieCard from '../../components/MovieCard/MovieCard';
import FilterGenre from '../../components/FilterGenre/FilterGenre';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState('all');

  useEffect(() => {
    async function fetchData() {
      const movies = await getPopularMovies();
      setMovies(movies);
      setFilteredMovies(movies);
    }
    fetchData();
  }, []);

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
    if (selectedGenre === 'all') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => movie.genre_ids.includes(selectedGenre)));
    }
  };

  return (
    <div className="movies-page">
      <h2>Liste des Films</h2>
      <FilterGenre genre={genre} onGenreChange={handleGenreChange} />
      <div className="movies-grid">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;