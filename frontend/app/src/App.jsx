import React from "react";
import "./css/App.css";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { updateLists } from "./store/actions/listActions"
import { updateSubLists } from "./store/actions/sublistActions"
import { updateTasks } from "./store/actions/taskActions"

import loginRequired from "./HOC/LoginRequired.jsx";

import Navbar from "./components/Navbar.jsx";
import Settings from './components/user/Settings.jsx';
import Login from './components/user/Login.jsx';
import Signup from './components/user/Signup.jsx';


import Lists from './components/list/Lists.jsx';
import SubLists from './components/sublist/SubLists.jsx';
import Tasks from './components/task/Tasks.jsx';


class App extends React.Component {

  componentDidMount() {
    this.props.onLoad()

    if (localStorage.getItem("dark") === null) {
      localStorage.setItem("dark", false)
    }
  }



  render() {
    const app = (<BrowserRouter>
      <Navbar />
      <section>
        <Switch>
          <Route exact path="/" component={loginRequired(Lists)} />
          <Route path="/settings/" component={loginRequired(Settings)} />
          <Route path="/login/" component={Login} />
          <Route path="/signup/" component={Signup} />
          <Route exact path="/list/:id/" component={loginRequired(SubLists)} />
          <Route exact path="/list/:list_id/:id/" component={loginRequired(Tasks)} />
        </Switch>
      </section>
    </BrowserRouter>
    );

    if (localStorage.getItem("dark") === "true") {
      import("./css/darkTheme.css").then(() => {
        return app
      })
    } else {
      import("./css/lightTheme.css").then(() => {
        return app
      })
    }

    return app
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(updateLists());
      dispatch(updateSubLists())
      dispatch(updateTasks())
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
