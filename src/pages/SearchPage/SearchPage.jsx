import React from "react";
import SearchResultBoxForm from "../../components/SearchResults/SearchResultBoxForm.jsx"
import "./SearchPage.scss"
const SearchPage = ()=>{
    return(
        <div id = "SearchPage" >
            <div id = "SearchResultBox">      
                <div id = "SearchResultBox__upper">
                    <div id = "SearchResultBox__title">
                        Travel & Babble
                    </div>
                    <div id = "SearchResultBox__description">
                        Cheap & Fun
                    </div>
                </div>
                <div id = "SearchResultBox__lower">
                    <div id = "SearchResultBox__lower__where">
                        Where would you like to go?
                    </div>
                    <SearchResultBoxForm />
                </div>
            </div>
        </div>

    )

    
}

export default SearchPage;