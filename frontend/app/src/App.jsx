import React from "react";
import "./css/App.css";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { updateLists } from "./store/actions/listActions"

import loginRequired from "./HOC/LoginRequired.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Lists from './components/list/Lists.jsx';
import Settings from './components/user/Settings.jsx';
import Login from './components/user/Login.jsx';
import Signup from './components/user/Signup.jsx';


class App extends React.Component {

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <section>
          <Switch>
            <Route exact path="/" component={loginRequired(Lists)} />
            <Route path="/settings/" component={loginRequired(Settings)} />
            <Route path="/login/" component={Login} />
            <Route path="/signup/" component={Signup} />
          </Switch>
        </section>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(updateLists())
  }
}

export default connect(null, mapDispatchToProps)(App);
