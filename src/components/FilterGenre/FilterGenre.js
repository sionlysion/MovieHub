import React from 'react';
import './FilterGenre.css';

const genres = [
  { id: 'all', name: 'Tous' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comédie' },
  // Ajoutez d'autres genres ici...
];

function FilterGenre({ genre, onGenreChange }) {
  return (
    <div className="filter-genre">
      <select value={genre} onChange={(e) => onGenreChange(parseInt(e.target.value))}>
        {genres.map(g => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterGenre;
