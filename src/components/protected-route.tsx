import { Redirect, Route } from "react-router-dom";
import { getRefreshToken } from "../services/auth";
import React, { ReactNode } from "react";


interface IProtectedRoute {
  children: ReactNode,

}
const ProtectedRoute: React.FC<IProtectedRoute> = ({ children, ...rest }) => {
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
