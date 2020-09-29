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
import SearchFound from "./SearchFound";
import SearchNotFound from "./SearchNotFound";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SearchPage = (props) => {
  let query = useQuery();
  const lat = getMaxAndMinLat(50, parseFloat(query.get("destinationLat")));

  const long = getMaxAndMinLong(
    50,
    parseFloat(query.get("destinationLong")),
    parseFloat(query.get("destinationLat"))
  );
  console.log(lat, long);
  return isNaN(lat.minLat) || isNaN(lat.maxLat) ? (
    <SearchNotFound />
  ) : (
    <SearchFound
      lat={lat}
      long={long}
      destinationLat={query.get("destinationLat")}
      destinationLong={query.get("destinationLong")}
      originTitle={query.get("originTitle")}
      destinationTitle={query.get("destinationTitle")}
    />
  );
};

export default SearchPage;
