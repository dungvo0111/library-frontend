import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

//Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
//Redux
import makeStore from "./redux/store";

axios.defaults.baseURL = "http://localhost:3000/api/v1";

const store = makeStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/userProfile" component={Profile} />
          <Route exact path="/resetPassword" component={ForgetPassword} />
          <Route
            exact
            path="/resetPassword/:resetToken"
            component={ResetPassword}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
