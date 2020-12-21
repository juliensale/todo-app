import React from "react";
import "./css/App.css";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Main from './components/Main.jsx';
import Settings from './components/user/Settings.jsx';
import Login from './components/user/Login.jsx';
import Signup from './components/user/Signup.jsx';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <section>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/settings/" component={Settings} />
          <Route path="/login/" component={Login} />
          <Route path="/signup/" component={Signup} />
        </Switch>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
