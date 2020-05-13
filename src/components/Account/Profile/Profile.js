import React from 'react';
import './Profile.css';
import { Button } from './Button';
import { EditPage } from './EditPage';

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isClicked: false,
      name: 'My Name',
      email: 'My Email',
      location: 'My Location'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: true });
  }
  // handleSave() {
  //   this
  // }

  changeName(newName) {
    this.setState({name: newName});
  }

  changeEmail(newEmail) {
    this.setState({name: newEmail});
  }

  changeLocation(newLocation) {
    this.setState({name: newLocation});
  }

  render(){
    return (
      <div className='Profile'>
          <div className='image-container'>
            <img src=''/>
          </div>
          <h1>{this.state.name}</h1>
          <div className='Personal-info'>
            <p>{this.state.email}</p>
            <p>{{this.state.location}}</p>
          </div>
          <Button status={this.state.isClicked} onClick={this.handleClick} />
          <EditPage status={this.state.isClicked onChange={() => {this.changeName;
                                                                  this.changeEmail;
                                                                  this.changeLocation}}/>
      </div>
    )
  }
}
