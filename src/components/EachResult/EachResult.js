import React from 'react';
import './EachResult.css';
// import { Paper } from "@material-ui/core";
import star from "../../static/img/star.png"
function EachResult() {
  return (

   
      <div className="eachResult">
        
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


  
  );
}
export default EachResult;
