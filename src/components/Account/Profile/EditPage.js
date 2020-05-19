import React from 'react';
import './EditPage.css';

export class EditPage extends React.Component {
  constructor(props){
    super(props);

  }

  handleNameChange(e){
    const name= e.target.value;

    this.props.onChange[0];
  }


  render(){
    console.log(this.props.onChange);
    if (this.props.status == true){
      return (
            <label for='name'>Name<label/><br></br>
            <input type='text' id='name' placeholder='Your name' onChange={this.handleNameChange}/><br></br>

            // <label for='password'>Password<label/><br></br>
            // <input type='text' id='password' placeholder='Enter your password' onChange={this.}/><br></br>

            // <label for='email'>Email<label/><br></br>
            // <input type='text' id='email' placeholder='Enter your email' onChange={this.}/><br></br>
            //
            // <label for='gender'>Gender<label/><br></br>
            // <input type='text' id='gender' placeholder='Your gender' onChange={this.}/><br></br>
            //
            // <label for='country'>Country<label/><br></br>
            // <input type='text' id='country' placeholder='Your country' onChange={this.}/><br></br>
      );
    }
  }

}
