import React from 'react';
import { Link } from 'react-router-dom';
import FrontPage from '../../pages/frontpage';

const SearchButton = () => {
    return(
    <div>
        <Link to="/search">
            <button>Find a ride</button>
        </Link>
        <FrontPage />
    </div>
    )
}

export default SearchButton;