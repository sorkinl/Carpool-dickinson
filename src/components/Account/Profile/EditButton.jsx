import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const StyledButton = withStyles({
  root: {
    background: '#F0D44A',
    borderRadius: 30,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 50px',
    boxShadow: '0 3px 5px 2px rgba(2, 2, 12, .3)',
  },

})(Button);

//Profile's edit button
export default function EditButton(props){
  //Change button's text based on button's state
  return(
    <StyledButton onClick={props.onClick} startIcon={<EditIcon />}>
      { props.status === true? 'Hide profile' : 'Edit profile'}
    </StyledButton>
  );
}
