import { useEffect, useState } from "react";
import Banner from "./Banner";
import { useParams } from "react-router-dom";

const MovieDetailPage=()=>
{
    const [movieDetail,setMovieDetail]=useState({});
    const{ movieId, pageDetail }=useParams();
  
    
    useEffect(()=>
    {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=${pageDetail}`)
        .then(res=>res.json())
        .then(data=>data.results.find((movie)=>movie.id==movieId))
        .then(movie=>setMovieDetail(movie));
    },[])

    return(
        <div>
              
               <Banner title={movieDetail?.title} rating={movieDetail?.vote_average} release={movieDetail?.release_date} votes={movieDetail?.vote_count} popularity={movieDetail?.popularity} description={movieDetail?.overview} imageUrl={`https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path}`} imgPoster={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`}/>
        </div>
    )
}

export default MovieDetailPage;