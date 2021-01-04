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

export const changeSublistComplete = (id, sublist) => {
    return {
        type: actionTypes.CHANGE_SUBLIST_COMPLETE,
        id: id,
        sublist: sublist
    }
}

export const createSubList = (list, title) => {
    return dispatch => {
        dispatch(addSubList({
            id: -1,
            list: list,
            title: title
        }))
        axios.post(URL, {
            list: list,
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const sublist = res.data;
            dispatch(changeSublistComplete(-1, sublist))
        }).catch(() => window.location.reload())
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
        dispatch(removeSubList(id))
        const DETAIL_URL = URL + id + '/';
        axios.delete(DETAIL_URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).catch(() => window.location.reload())
    }
}

export const changeSubList = (id, title) => {
    return {
        type: actionTypes.CHANGE_SUBLIST,
        id: id,
        title: title
    }
}

export const editSubList = (id, title) => {
    return dispatch => {
        dispatch(changeSubList(id, title))
        const DETAIL_URL = URL + id + '/';
        axios.patch(DETAIL_URL, {
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).catch(() => window.location.reload())
    }
}