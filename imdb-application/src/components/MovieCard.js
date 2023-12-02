import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFavourites } from "../store/favouriteReducer";

const MovieCard = ({ movie, activeDetaiPage }) => {
  const dispatch = useDispatch();
  const [showTooltip, setShowTooltip] = useState(false);
  const [addedToFavourites, setAddedToFavourites] = useState(false);

  const handleFavouriteClick = () => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isDuplicate = storedFavourites.some(favourite => favourite.id === movie.id);

    if (!isDuplicate) {
      dispatch(setFavourites(movie));
      localStorage.setItem('favourites', JSON.stringify([...storedFavourites, movie]));
      setAddedToFavourites(true);

      // Reset the addedToFavourites state after a few seconds (e.g., 3 seconds)
      setTimeout(() => {
        setAddedToFavourites(false);
      }, 1000);
    }
  };

  return (
    <div>
    <div
      className="movie-card"
      style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.poster_path}")` }}
    >
      <span className="icon-detail">
        <Link to={`./details/${movie.id}/${activeDetaiPage}`} className="info">
          &#9432;
        </Link>
      </span>
      <span
        className="icon-heart"
        onClick={handleFavouriteClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        &hearts;
        {showTooltip && <div className="tooltip">Add to Favourites</div>}
        {addedToFavourites && <div className="added-message">Added to Favourites</div>}
      </span>
    </div>
  
    </div>
    
  );
};

export default MovieCard;
