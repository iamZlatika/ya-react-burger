import { Redirect, Route, RouteProps } from "react-router-dom";
import { getRefreshToken } from "../services/auth";
import React from "react";


const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const loggedIn = !!getRefreshToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
