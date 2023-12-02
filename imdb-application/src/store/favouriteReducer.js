import { createSlice } from '@reduxjs/toolkit';

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        favourites: JSON.parse(localStorage.getItem('favourites')) || [],
        selectedGenreId: '',
        favouriteList: [],
        searchedFavourites: []
    },
    reducers: {
      setFavourites: (state, action) => {
            const checkIfExists = state.favourites.find((favourite) =>  favourite.id === action.payload.id);
            if (!checkIfExists) {
                state.favourites.push(action.payload);
                localStorage.setItem('favourites', JSON.stringify(state.favourites)); // Update localStorage
            }
        },
        setSelectedGenreId: (state, action) => {
            state.selectedGenreId = action.payload;
        },
        setFavouriteList: (state, action) => {
            const type = action.payload.type;
            if (type === 'SEARCH') {
                state.favouriteList = state.searchedFavourites.filter(movie => movie.title.toLowerCase().includes(action.payload.searchText.toLowerCase()));
            } 
            
            if (type === 'SORT'){
                state.favouriteList = state.searchedFavourites.sort((a, b) => action.payload.sortType ? a.popularity - b.popularity : b.popularity - a.popularity )
            }

            if (type === 'CATEGORY') {
                state.favouriteList = state.searchedFavourites;
            }
            
        },
        setSearchedFavourites: (state, action) => {
            state.searchedFavourites = state.selectedGenreId ? state.favourites.filter(movie => movie.genre_ids[0] == state.selectedGenreId) : state.favourites;
        },
        deleteFavourite: (state, action) => {
          // Remove the movie from favourites
          state.favourites = state.favourites.filter(
            (favourite) => favourite.id !== action.payload
          );
    
          // Remove the movie from favouriteList
          state.favouriteList = state.favouriteList.filter(
            (favourite) => favourite.id !== action.payload
          );
    
          // Update localStorage
          localStorage.setItem('favourites', JSON.stringify(state.favourites));
        },
        
    },
});

export const { setFavourites, setSelectedGenreId, setFavouriteList, setSearchedFavourites ,deleteFavourite} = favouriteSlice.actions;

export default favouriteSlice.reducer;