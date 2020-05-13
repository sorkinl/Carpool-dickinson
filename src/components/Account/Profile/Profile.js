import React from 'react';
import './Profile.css';
import { Button } from './Button';
import { EditPage } from './EditPage';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isClicked: false,
      name: 'My Name',
      email: 'My Email',
      location: 'My Location'
    };
    this.handleClick = this.handleClick.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  changeName(newName) {
    this.setState({name: newName});
  }

  changeEmail(newEmail) {
    this.setState({email: newEmail});
  }

  changeLocation(newLocation) {
    this.setState({location: newLocation});
  }

  render(){
    return (
      <div className='Profile'>
          <div className='Avatar'>
            <img src='https://i0.wp.com/wuhu.guru/wp-content/uploads/2019/07/profile-anonymous.jpg?fit=500%2C500&ssl=1' alt='' width='100' height='100'/>
          </div>

          <div className='Personal-info'>
            <h1>{this.state.name}</h1>
            <p>&#128231; {this.state.email}</p>
            <p> &#128205; {this.state.location}</p>
          </div>
          <Button status={this.state.isClicked} onClick={this.handleClick} />
          <EditPage status={this.state.isClicked} nameChange={this.changeName} eChange={this.changeEmail} loChange={this.changeLocation}/>

      </div>
    )
  }
}

export default Profile;
