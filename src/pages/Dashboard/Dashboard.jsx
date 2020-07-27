import React from 'react';
import logo from "../../assets/images/logo.png";
import icon from "../../assets/sprite.svg"
import avatar from '../../static/img/avatar.png'

const Dashboard = () => {
    return (
        <>
            <div className="container-dashboard">
                <header className="header-dashboard">
                    <img src={logo} alt="logo" className="logo-dashboard"/>
                    
                    <form action="#" className="search-dashboard">
                        <input type="text" className="search-dashboard__input" placeholder="Search by destination"/>
                        <button className="search-dashboard__button">
                            <svg className="search-dashboard__icon">
                                <use xlinkHref={`${icon}#icon-magnifying-glass`}></use>
                            </svg>
                        </button>
                    </form>

                    <nav className="user-nav">
                        <div className="user-nav__icon-box">
                            <svg className="user-nav__icon">
                                <use xlinkHref={`${icon}#icon-bookmark`}></use>
                            </svg>
                            <span className="user-nav__notification">7</span>
                        </div>
                        <div className="user-nav__icon-box">
                            <svg className="user-nav__icon">
                                <use xlinkHref={`${icon}#icon-chat`}></use>
                            </svg>
                            <span className="user-nav__notification">7</span>
                        </div>
                        <div className="user-nav__user">
                            <img src={avatar} alt="" className="user-nav__user-photo"/>
                            <span className="user-nav__user-name">Leonid</span>
                        </div>
                    </nav>
                </header>
                <div className="content-dashboard">
                    <nav className="sidebar-dashboard">
                       <ul className="side-nav-dash">
                           <li className="side-nav-dash__item side-nav-dash__item--active">
                               <a href="#" className="side-nav-dash__link--active">
                                   <svg className="side-nav-dash__icon">
                                       <use xlinkHref={`${icon}#icon-home`}></use>
                                   </svg>
                                   <span>Overview</span>
                               </a>
                           </li>
                           <li className="side-nav-dash__item">
                               <a href="#" className="side-nav-dash__link">
                                   <svg className="side-nav-dash__icon">
                                       <use xlinkHref={`${icon}#icon-location`}></use>
                                   </svg>
                                   <span>My trips</span>
                               </a>
                           </li>
                           <li className="side-nav-dash__item">
                               <a href="#" className="side-nav-dash__link">
                                   <svg className="side-nav-dash__icon">
                                       <use xlinkHref={`${icon}#icon-message`}></use>
                                   </svg>
                                   <span>Messages</span>
                               </a>
                           </li>
                           <li className="side-nav-dash__item">
                               <a href="#" className="side-nav-dash__link">
                                   <svg className="side-nav-dash__icon">
                                       <use xlinkHref={`${icon}#icon-user`}></use>
                                   </svg>
                                   <span>Profile</span>
                               </a>
                           </li>
                           
                       </ul>
                       <li className="side-nav-dash__item">
                               <a href="#" className="side-nav-dash__link">
                                   <span>Logout</span>
                               </a>
                           </li>
                       
                    </nav>


                    <main className="hotel-view-dashboard">
                        Hotel view
                    </main>
                </div>
            </div>
        </>
    );
}

export default Dashboard;