import React from 'react';
const Navbar = () => {
    return(
    
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

            <label htmlFor="navi-toggle" className="navigation__button">Menu</label>

            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <li className="navigation__item"><a href="#" className="navigation__link"></a>Login</li>
                    <li className="navigation__item"><a href="#" className="navigation__link"></a>Sign Up</li>
                    <li className="navigation__item"><a href="#" className="navigation__link"></a>About</li>
                </ul>
            </nav>
        </div>
    )
}


export default Navbar;