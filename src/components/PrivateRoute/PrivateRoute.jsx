import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Loading from "../Loading";
import HeaderBar from "../Dashboard/HeaderBar";
import SideBar from "../Dashboard/SideBar";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.firebase);

  return (
    <>  
      <HeaderBar/>
        {/* <div className="container-dashboard"> </div> */}
      <SideBar/>
      <Route
      {...rest}
      render={(props) => {

          if (user.auth.isEmpty) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          } else {
            if (user.profile.status == 1) {
              return (
                <Redirect
                  to={{
                    pathname: "/registrationForm",
                    state: { from: props.location },
                  }}
                />
              );
            } else if (user.auth.emailVerified == false) {
              return (
                <Redirect
                  to={{
                    pathname: "/verifyEmail",
                    state: { from: props.location },
                  }}
                />
              );
            } else {
              return (
                  <div className="page-layout">
                    <Component />
                  </div>
                );
            }
          }
        } 
      }
    />
    </>
  );
};

export default PrivateRoute;
