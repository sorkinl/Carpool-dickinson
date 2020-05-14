import React from 'react';
import './EditField.css';

export class EditField extends React.Component {
  constructor(props){
    super(props);

    this.handleNameEdit = this.handleEdit.bind(this, "name");
    this.handleEmailEdit = this.handleEdit.bind(this, "email");
    this.handleLocationEdit = this.handleEdit.bind(this, "location");
  }

  handleEdit(keyName, e){
    this.props.change(keyName, e.target.value);
  }

  render(){

    if (this.props.status ===  true){
      return (
            <div className='Edit-field'>
                <label for='name'>Name</label><br/>
                <input type='text' id='name' placeholder='Your name'  onChange={this.handleNameEdit} value={this.props["name"]}/><br/>

                <label for='password' align='left'>Password</label><br/>
                <input type='text' id='password' placeholder='Enter your password'/><br/>

                <label for='email'>Email</label><br/>
                <input type='text' id='email' placeholder='Enter your email' onChange={this.handleEmailEdit} value={this.props["email"]}/><br/>

                <label for='gender'>Gender</label><br/>
                <input type='text' id='gender' placeholder='Your gender'/><br/>

                <label for='country'>Location</label><br/>
                <select onChange={this.handleLocationEdit} value={this.props["location"]}>
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
