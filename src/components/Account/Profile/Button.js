import React from 'react';
import './Button.css';

export class Button extends React.Component {
  constructor(props){
    super(props);
    this.buttonMode = {
      edit: 'Edit profile',
      hide: 'Hide profile'
    }
  }

  render(){
    if((this.props.status) == true){
      return (
        <button onClick={this.props.onClick}>{this.buttonMode.hide}</button>
      );
    } else{
      return (
        <button onClick={this.props.onClick}>{this.buttonMode.edit}</button>
      );
    }
  }

}
