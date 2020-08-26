import React, { useState, useEffect } from 'react';
import {
    Grid
} from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faCreditCard,
    faKeyboard
} from "@fortawesome/free-regular-svg-icons";
import {
   faShieldAlt,
   faWrench,
} from "@fortawesome/free-solid-svg-icons";


export default function Setting(props) {
    return (
        <div className="setting">
            <p className="setting-section-title">Setting</p>
            <div id="aspect-content">
                <div className="aspect-tab">
                    <input id="item-18" type="checkbox" className="aspect-input" name="aspect"></input>
                    <label htmlFor="item-18" className="aspect-label"></label>
                    <div className="aspect-content">
                        <div className="aspect-info">
                        {/* <div class="chart-pie negative over50">
                            </div>  */}
                           <FontAwesomeIcon className="aspect-tab-icon" icon={faBell}></FontAwesomeIcon>
                            <span className="aspect-name">Notifications</span>
                        </div>

                    </div>
                    <div className="aspect-tab-content">
                        <div className="sentiment-wrapper">
                        </div>
                    </div>
                </div>

                <div className="aspect-tab">
                    <input id="item-14" type="checkbox" className="aspect-input" name="aspect"></input>
                    <label htmlFor="item-14" className="aspect-label"></label>
                    <div className="aspect-content">
                        <div className="aspect-info">
                {/* <div class="chart-pie positive over50">
                            </div>  */}
                            <FontAwesomeIcon className="aspect-tab-icon" icon={faCreditCard}></FontAwesomeIcon>
                            <span className="aspect-name">Payment method</span>
                        </div>
                    </div>
                    <div className="aspect-tab-content">
                        <div className="sentiment-wrapper">
                        </div>
                    </div>
                </div>
                <div className="aspect-tab">
                    <input id="item-2" type="checkbox" className="aspect-input" name="aspect"></input>
                    <label htmlFor="item-2" className="aspect-label"></label>
                    <div className="aspect-content">
                        <div className="aspect-info">
                            <FontAwesomeIcon className="aspect-tab-icon" icon={faWrench}></FontAwesomeIcon> 
                            <span className="aspect-name">Preferences</span>
                        </div>
                    </div>
                    <div className="aspect-tab-content">
                        <div className="sentiment-wrapper">
                        </div>
                    </div>
                </div>
                <div className="aspect-tab">
                    <input id="item-210" type="checkbox" className="aspect-input" name="aspect"></input>
                    <label htmlFor="item-210" className="aspect-label"></label>
                    <div className="aspect-content">
                        <div className="aspect-info">
                            <FontAwesomeIcon className="aspect-tab-icon" icon={faShieldAlt}></FontAwesomeIcon>
                            <span className="aspect-name">Privacy & Security
                            </span>
                        </div>
                    </div>
                    <div className="aspect-tab-content ">
                        <div className="sentiment-wrapper">
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}