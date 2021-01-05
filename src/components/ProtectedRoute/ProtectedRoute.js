import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ popupAuthOpen: setIsPopupAuthOpen, component: Component, header: Header, ...props }) => (
  <Route>
    {() =>
      props.loggedIn === true ? (
        <><Header {...props}/> <Component {...props}/></>
      ) : (
        <>
        <Redirect to="/news-explorer-frontend/" />
        {setIsPopupAuthOpen(true)}
        </>
      )
    }
  </Route>
);

export default ProtectedRoute;
