import axios from "axios";
import * as actions from "./actionTypes"
import API_URL from "./apiUrl"

export const authStart = () => ({
    type: actions.AUTH_START
})

export const authSuccess = (token) => {
    return {
        type: actions.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        error: error
    }
}

export const authLogin = (email, password) => {
    const URL = API_URL + 'users/token/'
    return dispatch => {
        dispatch(authStart())
        axios.post(URL, {
            email: email,
            password: password
        }).then(res => {
            const token = res.data.token
            localStorage.setItem('token', token)
            dispatch(authSuccess(token))
        }).catch(error => {
            dispatch(authFail(error))
        })
    }
}

export const authSignup = (username, email, password, name) => {
    const URL = API_URL + 'users/create/'
    return dispatch => {
        dispatch(authStart())
        var payload = {
            username: username,
            email: email,
            password: password
        }
        if (name) {
            payload = {
                ...payload,
                name: name
            }
        }
        axios.post(URL, payload).then(() => {
            dispatch(authLogin(email, password))
        }).catch(error => {
            dispatch(authFail(error))
        })
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: actions.AUTH_LOGOUT
    }
}