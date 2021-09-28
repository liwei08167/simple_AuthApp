import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import { NotFound } from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={DashBoard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="*" component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
