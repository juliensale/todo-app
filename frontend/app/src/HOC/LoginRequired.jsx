import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const loginRequired = (BaseComponent) => {

    class LoginRequired extends Component {
        render() {
            return (
                (this.props.isLoggedIn)
                    ? (
                        <BaseComponent {...this.props} />
                    ) : (
                        <div className="form-container">
                            <form>
                                <p>Vous devez être connecté pour cela.</p>
                                <NavLink to="/login">
                                    <button>Je me connecte</button>
                                </NavLink>
                            </form>
                        </div>
                    )
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            isLoggedIn: (state.authentication.token) ? (true) : (false)
        }
    }

    return connect(mapStateToProps)(LoginRequired)

}


export default (loginRequired)