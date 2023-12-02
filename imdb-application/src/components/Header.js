import { Link } from "react-router-dom";

const Header=()=>
{
    return(
        <div className="header">
            <span className="link"><Link to="/">Movies</Link></span>
            <span className="link"><Link to="/favourites">Favourites</Link></span>
        </div>
    )
}

export default Header;