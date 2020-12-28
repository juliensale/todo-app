import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import API_URL from '../../store/actions/apiUrl'
import { Link } from "react-router-dom"

import { connect } from 'react-redux'
import * as authActions from '../../store/actions/authActions'


const settingsContext = React.createContext()
const { Provider } = settingsContext
const Settings = ({ onLogout, children }) => {
    const handleLogout = () => {
        onLogout()
    }

    const value = {
        handleLogout
    }

    return (
        <Provider value={value}>

            <h1 className="back">
                <Link to="/"> {"<"} </Link>
                Options
            </h1>
            <div className="settings">
                {children}
            </div>

        </Provider>
    )

}

const SettingsDarkMode = () => {
    const [dark, setDark] = useState(localStorage.getItem('dark') === "true")

    const handleChange = () => {
        setDark(!dark)

    }

    useEffect(() => {
        localStorage.setItem("dark", dark)
    }, [dark])

    return (
        <div className="darkmode">
            <h2>Thème Jour/Nuit</h2>
            <input type="checkbox" checked={dark} onChange={handleChange} />
        </div>
    )
}

const SettingsProfile = () => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        username: '',
        email: '',
        name: ''
    })

    const URL = API_URL + 'users/me/'

    useEffect(() => {
        Axios.get(URL, {
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            setState({
                loading: false,
                username: res.data.username,
                email: res.data.email,
                name: res.data.name
            })
        }).catch(err => setState({
            error: "Il y a une erreur",
            loading: false
        }))
    }, [])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.patch(URL, {
            username: state.username,
            email: state.email,
            name: state.name
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        })
    };


    return (
        <div className="form-container">
            <h2>Édition du profil</h2>
            {
                state.loading
                    ? <p>Chargement...</p>
                    : (
                        <form onSubmit={handleSubmit}>
                            {state.error}
                            <input type="text" name="username" value={state.username} placeholder="Pseudo" onChange={handleChange} />
                            <input type="email" name="email" value={state.email} placeholder="E-mail" onChange={handleChange} />
                            <input type="text" name="name" value={state.name} placeholder="Nom complet (optionnel)" onChange={handleChange} />
                            <button>Enregistrer</button>
                        </form>
                    )
            }
        </div>
    )
}

const SettingsPassword = () => {
    const [state, setState] = useState({
        password1: '',
        password2: '',

    })

    const URL = API_URL + 'users/me/'


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const password_valid = () => {
        return state.password1 === state.password2 && state.password1 !== ''
    }

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if (password_valid()) {
            Axios.patch(URL, {
                password: state.password1
            }, {
                headers: {
                    Authorization: "Token " + localStorage.getItem("token")
                }
            })
        }
    }

    const missMatchError = password_valid() ? null : <p className="error">Les mots de passe diffèrent</p>

    return (
        <div className="form-container">
            <h2>Changer de mot de passe</h2>
            <form onSubmit={handleSubmitPassword}>
                {missMatchError}
                <input type="password" name="password1" value={state.password1} placeholder="Mot de passe" onChange={handleChange} />

                <input type="password" name="password2" value={state.password2} placeholder="Mot de passe (confirmation)" onChange={handleChange} />
                <button>Enregistrer</button>
            </form>
        </div >
    )
}

const SettingsDisconnect = () => {
    const { handleLogout } = useContext(settingsContext)

    const handleClick = () => {
        handleLogout()
    }

    return (
        <button className="disconnect-button" onClick={handleClick}>
            Déconnexion
        </button>
    )
}

const Usage = (props) => {

    return (
        <Settings {...props}>
            <SettingsDarkMode />
            <SettingsProfile />
            <SettingsPassword />
            <SettingsDisconnect />
        </Settings>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(authActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Usage);