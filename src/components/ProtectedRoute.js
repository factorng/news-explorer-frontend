import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, header: Header, ...props }) => (
  <Route>
    {() =>
      props.loggedIn === true ? (
        <><Header {...props}/> <Component {...props}/></>
      ) : (
        <Redirect to="/" />
      )
    }
  </Route>
);

export default ProtectedRoute;
