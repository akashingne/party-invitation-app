import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import { userContext } from "../Context/User/userProvider";
import Home from "../Pages/Home";

const Router = () => {
  return (
    <Switch>
      <RouteProtected path="/" component={Home} exact />
      <RouteRegistration path="/signin" component={SignIn} />
      <RouteRegistration path="/signup" component={SignUp} />
    </Switch>
  );
};

const RouteRegistration = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(userContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const RouteProtected = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(userContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default Router;
