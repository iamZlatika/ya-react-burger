import { Redirect, Route } from "react-router-dom";
import { getRefreshToken } from "../services/auth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, ...rest }) => {
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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
