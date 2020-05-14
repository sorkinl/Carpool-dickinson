import React from 'react';
import './EachResult.css';
// import { Paper } from "@material-ui/core";
import star from "../../static/img/star.png"
import avatar from "../../static/img/avatar.png"

function EachResult() {
  return (

   
      <div className="eachResult">
        
        <img src = {avatar} alt = "temp"/>



        <div className = "eachResultQueryResult">
  
          <div className="top">
            
            <div className = "extraStatus">
              SUPERHOST
            </div>
            <div className = "rating">
              <img src = {star} alt = "ratingStar"/>
              <span className ="ratingScore">4.5</span>     
                (<span className ="ratingNumber">3</span>)           
            </div>

          </div>
        
          <div>
        b
          </div>
          <div className="bottom">
              $24
          </div>
        </div>  
      </div>


  
  );
}
export default EachResult;
