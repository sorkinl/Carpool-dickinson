import React from "react";
import "./EachResult.scss";
import { Avatar } from "@material-ui/core";

function EachResult(props) {
  return (
   
    <div className = "EachResult__main">
      <div className = "info">
        <div className = "EachResult__headingInfo">
          <div className = "EachResult__address">
            {props.destTitle}
            
          </div>
          <div className = "EachResult__date">
           {props.departDate}
          </div>
        </div>
        <div className = "EachResult__text">
          <div className = "EachResult__comma">
            “
          </div>
          <div className = "EachResult__description">
            {props.departTime}
          </div>
          
        </div>
      </div>
      <div className="EachResult__profile">
        <div className = "EachResult__avatar">
          <Avatar src = {props.photoUrl} style = {{width:"60px", height:"60px"}}/>
        </div>
        <div className = "EachResult__profile__info">
          <div className = "EachResult__profile__name">
            {props.firstName} {props.lastName} 
          </div>
          <div className = "EachResult__profile__year">
            Dickinsonian '22'
          </div>
        </div>
      </div>
    </div>
  );
}
export default EachResult;
