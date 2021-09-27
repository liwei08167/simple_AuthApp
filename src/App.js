import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import DashBoard from "./components/DashBoard";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={DashBoard} />
            {/* 2 private route for dashboard/updateprofile */}
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
