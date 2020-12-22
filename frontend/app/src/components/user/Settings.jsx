import Axios from 'axios';
import React, { Component } from 'react'
import API_URL from '../../store/actions/apiUrl'

class Settings extends Component {

    state = {
        loading: true,
        error: null,
        username: '',
        email: '',
        password1: '',
        password2: '',
        name: '',
    }

    URL = API_URL + 'users/me/'



    componentDidMount() {
        Axios.get(this.URL, {
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        })
            .then(res => {
                this.setState({
                    loading: false,
                    username: res.data.username,
                    email: res.data.email,
                    name: res.data.name
                })
            }).catch(err => this.setState({
                error: "Il y a une erreur",
                loading: false
            }))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmitProfile = (e) => {
        e.preventDefault()
        Axios.patch(this.URL, {
            username: this.state.username,
            email: this.state.email,
            name: this.state.name
        })
        console.log(this.state)
    };

    password_valid = () => {
        return this.state.password1 === this.state.password2 && this.state.password1 !== ''
    }

    handleSubmitPassword = (e) => {
        e.preventDefault()
        if (this.password_valid()) {
            Axios.patch(this.URL, {
                password: this.state.password1
            })
        }
    }


    render() {

        const loading = this.state.loading ? <p>Chargement...</p> : null
        const missMatchError = this.password_valid() ? null : <p className="error">Les mots de passe diffèrent</p>

        return (
            <div className="form-container">
                {loading}
                {this.state.error}
                <form onSubmit={this.handleSubmitProfile}>
                    <h1>Édition du profil</h1>
                    <input type="text" name="username" value={this.state.username} placeholder="Pseudo" onChange={this.handleChange} />
                    <input type="email" name="email" value={this.state.email} placeholder="E-mail" onChange={this.handleChange} />
                    <input type="text" name="name" value={this.state.name} placeholder="Nom complet (optionnel)" onChange={this.handleChange} />
                    <button>Enregistrer</button>
                </form>
                <form onSubmit={this.handleSubmitPassword}>
                    <h1>Changer de mot de passe</h1>
                    <input type="password" name="password1" value={this.state.password1} placeholder="Mot de passe" onChange={this.handleChange} />
                    <input type="password" name="password2" value={this.state.password2} placeholder="Mot de passe (confirmation)" onChange={this.handleChange} />
                    <button>Enregistrer</button>
                </form>
            </div>
        )
    }
}

export default Settings;