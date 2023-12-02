import MovieCard from "./MovieCard";
import { movies as movieData } from "./mockData/movieData";
import {useEffect, useState} from 'react';
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setMoviePageStore } from "../store/productReducer";

const MovieList=()=>
{
   // const[activePage,setActivePage]=useState(1);
    //const [movies,setMovies]=useState();
    //const [moviePageStore, setMoviePageStore]=useState({});
    const {activePage,moviePageStore}=useSelector((state)=>state.products); 
    const dispatch=useDispatch();

   // const [activeDetaiPage, setActiveDetailPage] = useState(1);

    const fetchMovieData=()=>
    {
       
        const pageWiseMovie=moviePageStore[activePage];
        if(pageWiseMovie)
        {
            return;
        }
        else
        {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=${activePage}`)
            .then(res=>res.json())
            .then(data=>{
              dispatch(setMoviePageStore(data));
        });
        
        }
        //setActiveDetailPage(pageNumber); 
    }


    useEffect(()=>
    {
        fetchMovieData();
    },[activePage])

    return(
        <div className="movie-list">
             {
                moviePageStore?.[activePage]?.results?.map((movie)=>
                {
                     return (<MovieCard movie={movie} activeDetaiPage={activePage}/>);
                })
             }
             {
                moviePageStore?.[activePage]?.total_pages && ( 
                    <div className="pagination-wrapper">
                <Pagination totalPages={moviePageStore?.[activePage]?.total_pages} />
                  </div>
                )
             }
            
        </div>
    )
}

export default MovieList;