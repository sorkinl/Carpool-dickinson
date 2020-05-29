import React from 'react';
import { Link } from 'react-router-dom';

const SearchButton = () => {
    return(
    <Link to="/search">
    <button>Find a ride</button>
    </Link>
    )
}

export default SearchButton;