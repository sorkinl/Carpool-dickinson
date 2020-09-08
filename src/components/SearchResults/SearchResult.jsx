import React, {useState, useEffect} from "react";
import EachResult from "./EachResult/EachResult";
import { HereMap } from "../HereMap/HereMap";
import "./SearchResult.scss";
import { useSelector } from "react-redux";
import {getMaxAndMinLong} from "../../Utils/Distance"
import HeaderBar from "../Dashboard/HeaderBar";
const SearchResult = (props, title) =>{

  const trips =  useSelector(state=>state.tripsReducer)

  const filteredTrips = []
  
  //const long = getMaxAndMinLong(50, trips.searchProps.destCoord.long, trips.searchProps.destCoord.lat)
 
/* 
  console.log(long) */

  const tripList = trips.trips.map((trip)=>{
    console.log(trip)
   /*  if(trip.destination.longitude >= long.minLong && trip.destination.longitude <= long.maxLong){ */
      filteredTrips.push(trip)
      return(  <EachResult {...trip} />)
    /* }else{
      return <div></div>
    } */
    
  })

  return (
    <>
    <HeaderBar/>
    <div id = "searchresult__main">
      <div id = "searchresult__left">
        <div id = "searchresult__heading">
          <div id = "searchresult__triplength">
           {filteredTrips.length} results
          </div>
          <div id = "searchresult__tripname">
            Trips to {/* trips.searchProps.destTitle */}
          </div>
        </div>
        <hr className = "searchresult__hr"/>
        <div id = "searchresult__trips">
       
          {tripList}
        </div>
      </div>
      <div id = "searchresult__right">
        <div id = "searchresult__heremap">
          {console.log(filteredTrips)}
        <HereMap trips = {filteredTrips} />
        </div>
      </div>

    </div>
    </>
  )
}

export default SearchResult;
