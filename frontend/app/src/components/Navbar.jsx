import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux"

class Navbar extends Component {
    render() {
        return (
            <div className="nav-container">
                <div className="nav-content">
                    <div className="nav-user">
                        {(this.props.isLoggedIn)
                            ? (
                                <ul>
                                    <li><NavLink to="/settings"><i className="fas fa-cog"></i></NavLink></li>
                                </ul>
                            ) : (null)}
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: (state.authentication.token) ? (true) : (false)
    }
};




export default connect(mapStateToProps)(Navbar)