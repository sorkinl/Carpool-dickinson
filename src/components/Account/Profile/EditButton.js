import React from 'react';
import './EditButton.css';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FFB6C1 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 50px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

})(Button);

export default function EditButton(props){

  return(
    <StyledButton onClick={props.onClick} startIcon={<EditIcon />}>
      { props.status === true? 'Hide profile' : 'Edit profile'}
    </StyledButton>
  );
}
