import React from "react"
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Main from './components/Main.jsx'
import Settings from './components/user/Settings.jsx'
import Login from './components/user/Login.jsx'
import Signup from './components/user/Signup.jsx'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/settings/" component={Settings} />
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
