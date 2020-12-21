import React, { Component } from 'react'
import * as authActions from '../../store/actions/AuthActions'
import { connect } from 'react-redux'

class Signup extends Component {

    state = {
        username: '',
        email: '',
        password1: '',
        password2: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSignup(
            this.state.username,
            this.state.email,
            this.state.password1,
            this.state.password2
        )
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    {(this.props.error) ? (<p className="error">Une erreur est survenue</p>) : (null)}
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Pseudo" />
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="E-mail" />
                    <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Mot de passe" />
                    <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="Mot de passe (confirmation)" />
                    <button>Créer un compte</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.authentication.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (username, email, password1, password2) => dispatch(authActions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)