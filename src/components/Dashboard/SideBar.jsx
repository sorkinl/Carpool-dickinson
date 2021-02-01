import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faHome,
  faMapMarkerAlt,
  faCommentDots,
  faSearch,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

const SideBar = () => {
  const [pathname, setPath] = useState("");

  let location = useLocation();
  let path = location.pathname.toLocaleLowerCase();
  useEffect(() => {
    if (path.includes("search")) {
      setPath("search");
    } else if (path.includes("posttrip")) {
      setPath("posttrip");
    } else if (path.includes("dashboard")) {
      setPath("dashboard");
    } else if (path.includes("chat")) {
      setPath("chat");
    } else if (path.includes("mytrips")) {
      setPath("mytrips");
    }
  });
  console.log(pathname);
  return (
    <nav className="sidebar-dashboard">
      <ul className="side-nav-dash">
        <li>
          <div className="multi-ride-button">
            <Link to="/search">
              <div className="button-multi-find r" id="button-1">
                {/* <input type="checkbox" className="checkbox" onClick={() => setActive(!active)}/> */}
                <div className="knobs-find">
                  <span>
                    <FontAwesomeIcon className="multi-icon" icon={faSearch} />
                    <p className="knobs-find-p">Find</p>
                  </span>
                </div>
                <div className="layer"></div>
              </div>
            </Link>
            <Link to="/posttrip">
              <div className="knobs-post">
                <span>
                  <FontAwesomeIcon
                    className="multi-icon multi-icon--post"
                    icon={faPlusCircle}
                  />
                  <p>Post</p>
                </span>
              </div>
            </Link>
          </div>
        </li>
        <li
          className={`side-nav-dash__item${
            pathname == "dashboard" ? "--active" : ""
          }`}
        >
          <Link
            to="/dashboard"
            className={`side-nav-dash__link${
              pathname == "dashboard" ? "--active" : ""
            }`}
          >
            <FontAwesomeIcon
              className="side-nav-dash__icon"
              icon={faHome}
            ></FontAwesomeIcon>
            <p>Home</p>
          </Link>
        </li>
        <li
          className={`side-nav-dash__item${
            pathname == "trips" ? "--active" : ""
          }`}
        >
          <Link
            to="/trips"
            className={`side-nav-dash__link${
              pathname == "trips" ? "--active" : ""
            }`}
          >
            <FontAwesomeIcon
              className="side-nav-dash__icon"
              icon={faMapMarkerAlt}
            ></FontAwesomeIcon>
            <span>My trips</span>
          </Link>
        </li>
      </ul>
      <li className="side-nav-dash__item">
        <a href="#" className="side-nav-dash__link">
          <span>Logout</span>
        </a>
      </li>
    </nav>
  );
};

export default SideBar;
