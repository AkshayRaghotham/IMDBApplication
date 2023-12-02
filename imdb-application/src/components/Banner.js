const Banner=({title, description,imageUrl,imgPoster,release,rating,votes,popularity})=>
{
    return(
        <div className="banner" style={{backgroundImage: `url(${imageUrl})`}}>
            <div className="detail-contaier">
            <div className="detail">
              
               <div className="movie-poster" style={{backgroundImage: `url(${imgPoster})`}}></div>
                <h1>{title}</h1>
                <div className="sub-details">
                <h3>Release Date: {release}</h3>
                <h3>Rating: {rating}</h3>
                <h3>Votes: {votes}</h3>
                <h3>Popularity: {popularity}</h3>
                </div>
                
                <div className="overview-wrapper">
                <h2>Overview</h2>
                <p>{description}</p>
                </div>
                <div>

               </div>
            </div>
            </div>
        </div>
    )
}

export default Banner;