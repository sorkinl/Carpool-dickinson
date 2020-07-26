import React, {} from "react";
import EachResult from "./EachResult/EachResult";
import { HereMap } from "../HereMap/HereMap";
import "./SearchResult.scss";
import { useSelector } from "react-redux";

function SearchResult() {
  const trips = useSelector(state=>state.tripsReducer)
  console.log(trips)
  const tripList = trips.trips.map((trip) => (
      <EachResult {...trip} />

  ))

  return (

    <div id = "searchresult__main">
      <div id = "searchresult__left">
        <div id = "searchresult__heading">
          <div id = "searchresult__triplength">
           {trips.trips.length} results
          </div>
          <div id = "searchresult__tripname">
            Trips to 
          </div>
        </div>
        <hr className = "searchresult__hr"/>
        <div id = "searchresult__trips">
       
          {tripList}
        </div>
      </div>
      <div id = "searchresult__right">
        <div id = "searchresult__heremap">
        <HereMap trips = {trips} />
        </div>
      </div>

    </div>
  )
}

export default SearchResult;
