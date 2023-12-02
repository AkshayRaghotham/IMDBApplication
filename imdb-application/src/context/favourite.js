import { createContext } from 'react';
import { useState } from 'react';

export const FavouriteContext = createContext();

const FavouriteProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    return (
        <FavouriteContext.Provider value={{favourites, setFavourites}}>
            {children}
        </FavouriteContext.Provider>
    )
}
export default FavouriteProvider;