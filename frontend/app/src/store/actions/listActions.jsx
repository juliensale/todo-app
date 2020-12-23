import axios from "axios";
import * as actions from "./actionTypes"
import API_URL from "./apiUrl"

const URL = API_URL + 'todo/lists/'


export const setLists = (lists) => {
    return {
        type: actions.SET_LISTS,
        lists: lists
    }
}

export const updateLists = () => {
    return dispatch => {
        axios.get(URL, {
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const lists = res.data
            dispatch(setLists(lists))
        }).catch(err => console.log(err))
    }
}

export const addList = (list) => {
    return {
        type: actions.ADD_LIST,
        list: list
    }
}

export const createList = (title, color) => {
    return dispatch => {
        axios.post(URL, {
            title: title,
            color: color
        }, {
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const list = res.data
            dispatch(addList(list))
        }).catch(err => console.log(err))
    }
}


export const removeList = (id) => {
    return {
        type: actions.REMOVE_LIST,
        id: id
    }
}

export const deleteList = (id) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/';
        axios.delete(DETAIL_URL, {
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(removeList(id))
            }).catch(err => console.log(err))
    }
}

export const changeList = (id, title, color) => {
    return {
        type: actions.CHANGE_LIST,
        id: id,
        title: title,
        color: color
    }
}

export const editList = (id, title, color) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/';
        axios.patch(DETAIL_URL, {
            title: title,
            color: color
        }, {
            headers: {
                "Authorization": "Token " + localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(changeList(id, res.data.title, res.data.color))
            }).catch(err => console.log(err))
    }
}
