import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div className="nav-container">
                <div className="nav-content">
                    <NavLink to="/" className="nav-logo">Logo</NavLink>
                    <div className="nav-user">
                        {(this.props.isLoggedIn)
                            ? (
                                <ul>
                                    <li><NavLink to="/settings">Parametres</NavLink></li>
                                    <li><button onClick={this.props.onLogout}>Déconnexion</button></li>
                                </ul>
                            ) : (
                                <ul>
                                    <li><NavLink to="/login">Se connecter</NavLink></li>
                                    <li><NavLink to="/signup">S'inscrire</NavLink></li>
                                </ul>
                            )
                        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(authActions.logout())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Navbar)