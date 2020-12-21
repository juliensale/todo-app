import React, { Component } from 'react'
import * as authActions from '../../store/actions/AuthActions'
import { connect } from 'react-redux'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onLogin(this.state.email, this.state.password)
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    {(this.props.error) ? (<p className="error">Une erreur est survenue</p>) : (null)}
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="E-mail" />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Mot de passe" />
                    <button>Se connecter</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.authentication.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(authActions.authLogin(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)