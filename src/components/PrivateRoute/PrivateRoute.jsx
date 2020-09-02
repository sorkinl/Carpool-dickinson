import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Loading from "../Loading";
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import DashboardSideBar from '../Dashboard/DashboardSideBar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.firebase);

  return (
    <div className="container-dashboard">
    <DashboardNavbar/>
    <div className="content-dashboard">
    <DashboardSideBar/>
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
              return <Component />;
            }
          }
        } 
      }
    />
    </div>
    </div>
  );
};

export default PrivateRoute;
