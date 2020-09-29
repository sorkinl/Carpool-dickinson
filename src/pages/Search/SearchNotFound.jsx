import React from "react";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import { HereMap } from "../../components/HereMap/HereMap";
import { Link, useLocation } from "react-router-dom";
import icon from "../../assets/sprite.svg";
import avatar from "../../static/img/avatar.png";
import { useFirestoreConnect, isLoaded } from "react-redux-firebase";
import {
  getMaxAndMinLat,
  getMaxAndMinLong,
  distance,
} from "../../Utils/Distance";
import { useSelector, useDispatch } from "react-redux";
import { getTripByRadius } from "../../redux/actions/tripsActions";
import TripCardSearch from "../../components/Search/TripCardSearch";
const SearchNotFound = () => {
  return (
    <>
      <div className="search-container">
        <div className="search-trip-list">
          <Link to="/dashboard" className="search-trip-list__back">
            Back to dashboard
          </Link>
          <h2 className="search-trip-list__heading">No trips</h2>
        </div>
        <div className="search-map">
          <HereMap />
        </div>
      </div>
    </>
  );
};

export default SearchNotFound;
