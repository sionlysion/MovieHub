import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api/tmdb';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const movieDetails = await getMovieDetails(id);
      setMovie(movieDetails);
      checkIfFavorite(movieDetails);
    }
    fetchData();
  }, [id]);

  const addToFavorites = (movie) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(fav => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const removeFromFavorites = (movieId) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(false);
  };

  const checkIfFavorite = (movie) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.find(fav => fav.id === movie.id)) {
      setIsFavorite(true);
    }
  };

  return (
    <div className="movie-details">
      {movie ? (
        <>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Date de sortie :</strong> {movie.release_date}</p>
          <p><strong>Durée :</strong> {movie.runtime} minutes</p>
          <p><strong>Note :</strong> {movie.vote_average}/10</p>
          {isFavorite ? (
            <button onClick={() => removeFromFavorites(movie.id)}>Retirer des Favoris</button>
          ) : (
            <button onClick={() => addToFavorites(movie)}>Ajouter aux Favoris</button>
          )}
        </>
      ) : (
        <p>Chargement des détails...</p>
      )}
    </div>
  );
}

export default MovieDetails;
