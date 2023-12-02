import MovieHeading from "./MovieHeading";
import MovieList from "./MovieList";

const MovieListWrapper=()=>
{
    return(
        <div className="movie-list-wrapper">
            <MovieHeading/>
            <MovieList />
        </div>
    )
}

export default MovieListWrapper;