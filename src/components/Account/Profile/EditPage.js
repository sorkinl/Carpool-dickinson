import React from 'react';
import './EditPage.css';

export class EditPage extends React.Component {
  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleNameChange(e){
    const name= e.target.value;
    this.props.nameChange(name);
  }

  handleEmailChange(e){
    const email= e.target.value;
    this.props.eChange(email);
  }

  handleCountryChange(e){
    const country= e.target.value;
    this.props.loChange(country);
  }

  render(){
    console.log(this.props.onChange);
    if (this.props.status ===  true){
      return (
            <div className='Edit-field'>
                <label for='name'>Name</label>
                <input type='text' id='name' placeholder='Your name' onChange={this.handleNameChange}/><br/>

                <label for='password'>Password</label>
                <input type='text' id='password' placeholder='Enter your password'/><br/>

                <label for='email'>Email</label>
                <input type='text' id='email' placeholder='Enter your email' onChange={this.handleEmailChange}/><br/>

                <label for='gender'>Gender</label>
                <input type='text' id='gender' placeholder='Your gender'/><br/>

                <label for='country'>Country</label>
                <select onChange={this.handleCountryChange}>
                  <option value='Carlisle'>Carlisle</option>
                  <option value='Saigon'>Saigon</option>
                  <option value='Seoul'>Seoul</option>
                  <option value='St. Petersburg'>St. Petersburg</option>
                </select>
          </div>
      );
    }
    else {
      return (
        ''
      );
    }
  }
}
