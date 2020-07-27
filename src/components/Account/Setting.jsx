import React, { useState, useEffect } from 'react';
import {
    Grid
} from '@material-ui/core';

export default function Setting(props) {
    return (
        <div class="setting">
            <p className="setting-name">Setting</p>
            <hr/> 
                <input type="radio" id="tab1" name="tab-control" defaultChecked/>
                <input type="radio" id="tab2" name="tab-control"/>
                <input type="radio" id="tab3" name="tab-control"/>  
            <ul>
                <li title="Console">
                    <label for="tab1" role="button">
                        <span>Reviews</span>
                    </label>
                </li>
                <li title="Upcoming">
                    <label for="tab2" role="button">
                        <span>Notifications</span>
                    </label>
                </li>
                <li title="Past">
                    <label for="tab3" role="button">
                        <span>Privacy & Security</span>
                    </label>
                </li>    
            </ul>
                
            <div class="slider">
                <div class="indicator"></div>
            </div>
                
            <div class="content-setting">
                <section>
                    <h2>Reviews</h2>
                        Tab 1
                </section>
                <section>
                    <h2>Notifications</h2>
                        Tab 2
                </section>
                <section>
                    <h2>Privacy & Security</h2>
                        Tab 3
                </section>
            </div>
        </div>    
    )
}