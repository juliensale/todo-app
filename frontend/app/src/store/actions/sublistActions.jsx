import axios from "axios";
import * as actionTypes from "./actionTypes"
import API_URL from "./apiUrl"

const URL = API_URL + "todo/sublists/"

export const setSubLists = (sublists) => {
    return {
        type: actionTypes.SET_SUBLISTS,
        sublists: sublists
    }
}

export const updateSubLists = () => {
    return dispatch => {
        axios.get(URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const sublists = res.data
            dispatch(setSubLists(sublists))
        }).catch(err => console.log(err))

    }
}

export const addSubList = (sublist) => {
    return {
        type: actionTypes.ADD_SUBLIST,
        sublist: sublist
    }
}

export const createSubList = (list, title) => {
    return dispatch => {
        axios.post(URL, {
            list: list,
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const sublist = res.data;
            dispatch(addSubList(sublist))
        }).catch(err => console.log(err))
    }
}

export const removeSubList = (id) => {
    return {
        type: actionTypes.REMOVE_SUBLIST,
        id: id
    }
}

export const deleteSubList = (id) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/';
        axios.delete(DETAIL_URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            dispatch(removeSubList(id))
        }).catch(err => console.log(err))
    }
}

export const changeSubList = (id, list, title) => {
    return {
        type: actionTypes.CHANGE_SUBLIST,
        id: id,
        list: list,
        title: title
    }
}

export const editSubList = (id, title) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/';
        axios.patch(DETAIL_URL, {
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const list = res.data.list
            dispatch(changeSubList(id, list, title))
        }).catch(err => console.log(err))
    }
}