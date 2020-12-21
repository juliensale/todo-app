import React, { Component } from 'react'
import * as authActions from '../../store/actions/authActions'
import { connect } from 'react-redux'

class Signup extends Component {

    state = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    is_valid = () => {
        var bool = true

        bool = bool && (this.state.password1 === this.state.password2)

        return bool
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.is_valid()) {
            this.props.onSignup(
                this.state.username,
                this.state.email,
                this.state.password1,
                this.state.name
            )
        } else {
            console.log('les mots de passe different')
        }
    }

    render() {
        let missMatch = null
        if (this.state.password1 !== this.state.password2) {
            missMatch = <p className="error">Les mots de passe sont différents</p>
        }

        const button = (this.is_valid()) ? (<button>Créer un compte</button>) : (<div className="fake-button">Créer un compte</div>)

        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    {(this.props.error) ? (<p className="error">Une erreur est survenue</p>) : (null)}
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Pseudo" />
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="E-mail" />
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Nom (optionnel)" />
                    <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange} placeholder="Mot de passe" />
                    {missMatch}
                    <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange} placeholder="Mot de passe (confirmation)" />
                    {button}
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
        onSignup: (username, email, password, name) => dispatch(authActions.authSignup(username, email, password, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)