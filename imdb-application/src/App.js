import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import MovieListWrapper from './components/MovieListWrapper';
import Favourites from './components/Favourites';
import MoviePage from './components/MoviePage';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import MovieDetailPage from './components/MovieDetailPage';
import { useState } from 'react';
import FavouriteProvider from './context/favourite';


function App() {
  const[favourites,setFavourites]=useState([]);
  return (
    <div className="container">
      <BrowserRouter>
         <Header/>
        <FavouriteProvider>
             <Routes>
                <Route path="/" element={<MoviePage />}/>
                <Route path="/favourites" element={<Favourites />}/>
                <Route path="/details/:movieId/:pageDetail" element={<MovieDetailPage/>}/>
            </Routes>
            </FavouriteProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
