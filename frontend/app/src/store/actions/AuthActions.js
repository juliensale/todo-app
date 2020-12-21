import axios from "axios";
import * as actions from "./ActionTypes"

const API_URL = "http://192.168.99.100:8000/api/"

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

export const authSignup = (username, email, password1, password2) => {
    const URL = API_URL + 'users/create/'
    return dispatch => {
        dispatch(authStart())
        axios.post(URL, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.token
            localStorage.setItem('token', token)
            dispatch(authSuccess(token))
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