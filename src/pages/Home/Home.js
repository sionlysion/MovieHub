import React, { useState, useEffect } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import FilterGenre from '../../components/FilterGenre/FilterGenre';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import Loading from '../../components/Loading/Loading';
import { getPopularMovies, searchMovies } from '../../api/tmdb';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const moviesData = query ? await searchMovies(query) : await getPopularMovies();
      setMovies(moviesData);
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  return (
    <div className="home">
      <SearchMovie onSearch={setQuery} />
      <FilterGenre genre={genre} onGenreChange={handleGenreChange} />
      {loading ? <Loading /> : <MoviesList movies={movies} />}
    </div>
  );
}

export default Home;
