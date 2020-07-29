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
        <div class="setting">
            <p className="setting-section-title">Setting</p>
            <div id="aspect-content">
                <div class="aspect-tab">
                    <input id="item-18" type="checkbox" class="aspect-input" name="aspect"></input>
                    <label for="item-18" class="aspect-label"></label>
                    <div class="aspect-content">
                        <div class="aspect-info">
                        {/* <div class="chart-pie negative over50">
                            </div>  */}
                           <FontAwesomeIcon className="aspect-tab-icon" icon={faBell}></FontAwesomeIcon>
                            <span class="aspect-name">Notifications</span>
                        </div>

                    </div>
                    <div class="aspect-tab-content">
                        <div class="sentiment-wrapper">
                        </div>
                    </div>
                </div>

                <div class="aspect-tab">
                    <input id="item-14" type="checkbox" class="aspect-input" name="aspect"></input>
                    <label for="item-14" class="aspect-label"></label>
                    <div class="aspect-content">
                        <div class="aspect-info">
                {/* <div class="chart-pie positive over50">
                            </div>  */}
                            <FontAwesomeIcon className="aspect-tab-icon" icon={faCreditCard}></FontAwesomeIcon>
                            <span class="aspect-name">Payment method</span>
                        </div>
                    </div>
                    <div class="aspect-tab-content">
                        <div class="sentiment-wrapper">
                        </div>
                    </div>
                </div>
                <div class="aspect-tab">
                    <input id="item-2" type="checkbox" class="aspect-input" name="aspect"></input>
                    <label for="item-2" class="aspect-label"></label>
                    <div class="aspect-content">
                        <div class="aspect-info">
                            <FontAwesomeIcon className="aspect-tab-icon" icon={faWrench}></FontAwesomeIcon> 
                            <span class="aspect-name">Preferences</span>
                        </div>
                    </div>
                    <div class="aspect-tab-content">
                        <div class="sentiment-wrapper">
                        </div>
                    </div>
                </div>
                <div class="aspect-tab">
                    <input id="item-210" type="checkbox" class="aspect-input" name="aspect"></input>
                    <label for="item-210" class="aspect-label"></label>
                    <div class="aspect-content">
                        <div class="aspect-info">
                            <FontAwesomeIcon className="aspect-tab-icon" icon={faShieldAlt}></FontAwesomeIcon>
                            <span class="aspect-name">Privacy & Security
                            </span>
                        </div>
                    </div>
                    <div class="aspect-tab-content ">
                        <div class="sentiment-wrapper">
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}