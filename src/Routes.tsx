import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/userProfile" component={Profile} />
    <Route exact path="/resetPassword" component={ForgetPassword} />
    <Route exact path="/resetPassword/:resetToken" component={ResetPassword} />
  </Switch>
);

export default Routes;
