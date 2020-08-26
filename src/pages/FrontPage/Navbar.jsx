import React from "react";
import { Link } from "react-router-dom";
import { useSelector, dispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../../firebase/firebaseConfig";
const Navbar = () => {
  //  const auth = useSelector((state) => state.firebase.auth);

  //   function handleLogOut(e) {
  //       e.preventDefault();
  //       firebase.auth().signOut()
  //     }

  //   const links = auth.uid ? (
  //       <>
  //       <li className="navigation__item"><Link to="/" className="navigation__link" onClick={handleLogOut}>Log Out</Link></li>
  //                   <li className="navigation__item"><a href="#" className="navigation__link">About</a></li>
  //                   </>
  //   ): (
  //       <>
  //       <li className="navigation__item"><Link to="/logIn" className="navigation__link">Login</Link></li>
  //       <li className="navigation__item"><Link to="/signUp" className="navigation__link">Sign Up</Link></li>
  //       <li className="navigation__item"><a href="#" className="navigation__link">About</a></li>
  //       </>
  //   )
  //   return(
    
  //       <div className="navigation">
  //           <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

  //           <label htmlFor="navi-toggle" className="navigation__button">
  //               <span className="navigation__icon">&nbsp;</span>
  //           </label>

  //           <div className="navigation__background">&nbsp;</div>

  //           <nav className="navigation__nav">
  //               <ul className="navigation__list">
  //                   {links}
  //               </ul>
  //           </nav>
  //       </div>
  //   ) 

  const [active, setActive] = React.useState(false);

  return (
    <div>
      <div
        id="circularMenu1"
        className={`circular-menu circular-menu-left ${active ? "active" : ""}`}
      >
        <Link
          to="/"
          className="floating-btn"
          onClick={() => setActive(!active)}
        >
          <FontAwesomeIcon
            className="floating-btn-icon"
            size="2x"
            icon={faBars}
          />
        </Link>
        <menu className="items-wrapper">
          <Link className="menu-item">
            <FontAwesomeIcon
              size="2x"
              className="menu-item-icon"
              icon={faHome}
            />
          </Link>
          <Link to="/logIn" className="menu-item">
            <FontAwesomeIcon
              size="2x"
              className="menu-item-icon"
              icon={faSignInAlt}
            />
          </Link>
          <Link to="/signUp" className="menu-item">
            <FontAwesomeIcon
              size="2x"
              className="menu-item-icon"
              icon={faUserPlus}
            />
          </Link>
        </menu>
      </div>
    </div>
  );
};

export default Navbar;
