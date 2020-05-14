import React from 'react';
import './Profile.css';
import { Button } from './Button';
import { EditField } from './EditField';

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
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleClick() {
    this.setState({ isClicked: !this.state.isClicked });
  }

  handleChange(keyName, newInfo){
    this.setState({ [keyName]: newInfo });
  }

  render(){
    return (
      <div className='Profile'>
          <h1>Profile</h1>
          <div className='Avatar'>
            <img src='https://i0.wp.com/wuhu.guru/wp-content/uploads/2019/07/profile-anonymous.jpg?fit=500%2C500&ssl=1' alt='' width='100' height='100'/>
          </div>

          <div className='Personal-info'>
            <h2>{this.state.name}</h2>
            <p>&#128231; {this.state.email}</p>
            <p> &#128205; {this.state.location}</p>
          </div>
          <Button status={this.state.isClicked} onClick={this.handleClick} />
          <EditField status={this.state.isClicked} change={this.handleChange} {...this.state}/>
      </div>
    )
  }
}

export default Profile;
