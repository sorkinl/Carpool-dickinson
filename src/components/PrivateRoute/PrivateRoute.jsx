import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import firebase from 'firebase'
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase'

const PrivateRoute = ({ component: Component, ...rest }) => {
    
 const user = useSelector(state => state.firebase)
  return(
    <Route {...rest} render={props => {
      if(user.auth.isEmpty){
        return (<Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>)
      } else {
          if(user.profile.status == 1){
            return (<Redirect to={{
                pathname: '/registrationForm',
                state: { from: props.location }
              }}/>)
          } else {
            return(<Component />)
          }
        }
    }}/>
  )
}

export default PrivateRoute