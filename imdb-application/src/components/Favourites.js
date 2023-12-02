import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { FavouriteContext } from "../context/favourite";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedGenreId, setFavouriteList, setSearchedFavourites} from './../store/favouriteReducer';
import { deleteFavourite } from "./../store/favouriteReducer";

let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

const Favourites = () => {

    const { favourites, selectedGenreId, favouriteList, searchedFavourites} = useSelector((state) => state.favourites);
    const dispatch = useDispatch();

    useEffect(() => {
      const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
      dispatch(setFavouriteList({ type: 'CATEGORY' }));
      dispatch(setSearchedFavourites(storedFavourites));
    }, []);
    
    const genres = useMemo(() => Array.from(new Set(favourites.map(favourite => favourite.genre_ids[0]))), [favourites]);

    const handleSearch = useCallback( (e) => {
        const searchText = e.target.value;
        dispatch(setFavouriteList({ type: 'SEARCH', searchText }));
    }, []);

    const handleSort = useCallback((sortType) => {
        dispatch(setFavouriteList({ type: 'SORT', sortType }));
    }, []);
    
   


    const filterFavourites = useCallback(() => {
        dispatch(setSearchedFavourites());
        dispatch(setFavouriteList({ type: 'CATEGORY' }));
    }, []);

    useEffect(() => {
        filterFavourites();
    }, [selectedGenreId]);

        return (
          <div className="favourite-page">
            <h1 className="favourite-heading"></h1>
      
            <div className="left-section">
              <div className="genres-wrapper">
                <ul>
                  <li
                    className={!selectedGenreId ? "selected" : ""} onClick={() => {dispatch(setSelectedGenreId());}}>
                    All Genres
                  </li>
                  {genres?.map((genreId) => (
                    <li
                      key={genreId}
                      className={selectedGenreId === genreId ? "selected" : ""}
                      onClick={() => {
                        dispatch(setSelectedGenreId(genreId));
                      }}
                    >
                      {genreids[genreId]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right-section">
              <input
                type="search"
                className="search-holder"
                onChange={handleSearch}
                placeholder="Enter Movie Name"
              />
              <table>
                <thead>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th className="rating-button">
                    <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" onClick={() => handleSort(true)}/>Popularity
                    <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" onClick={() => handleSort(false)}/>
                  </th>
                  <th>Rating</th>
                  <th>Actions</th>
                </thead>
                <tbody>
                  {favouriteList?.map((favourite) => (
                    <tr key={favourite.id}>
                      <td>
                        <img
                          width="100px"
                          src={`https://image.tmdb.org/t/p/original${favourite.backdrop_path}`}
                          alt={favourite.title}
                        />
                      </td>
                      <td>{favourite.title}</td>
                      <td>{genreids[favourite.genre_ids[0] || null]}</td>
                      <td>{favourite.popularity}</td>
                      <td>{favourite.vote_average}</td>
                      <td>
                        <button onClick={() => dispatch(deleteFavourite(favourite.id))}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      };
      
      export default Favourites;