import React from 'react';
import EachResult from './EachResult';
import '../static/css/SearchResults.css';

function SearchResult() {
  
  return (
    <div id = "searchResults">
      Search
      <EachResult/>
    </div>
  );
}

export default SearchResult;
