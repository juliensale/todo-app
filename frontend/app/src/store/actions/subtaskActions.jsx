import axios from "axios";
import * as actionTypes from "./actionTypes"
import API_URL from "./apiUrl"
import errorFunction from "./errorFunction"

const URL = API_URL + 'todo/subtasks/'

export const setSubTasks = (subtasks) => {
    return {
        type: actionTypes.SET_SUBTASKS,
        subtasks: subtasks
    }
}

export const updateSubTasks = () => {
    return dispatch => {
        axios.get(URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const subtasks = res.data;
            dispatch(setSubTasks(subtasks))
        }).catch(err => console.log(err))
    }
}

export const addSubTask = (subtask) => {
    return {
        type: actionTypes.ADD_SUBTASK,
        subtask: subtask
    }
}

export const changeSubTaskComplete = (id, subtask) => {
    return {
        type: actionTypes.CHANGE_SUBTASK_COMPLETE,
        id: id,
        subtask: subtask
    }
}

export const createSubTask = (task, title) => {
    return dispatch => {
        dispatch(addSubTask({
            id: -1,
            task: task,
            title: title,
            completed: false
        }))
        axios.post(URL, {
            task: task,
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const subtask = res.data;
            dispatch(changeSubTaskComplete(-1, subtask))
        }).catch(() => errorFunction())
    }
}

export const removeSubTask = (id) => {
    return {
        type: actionTypes.REMOVE_SUBTASK,
        id: id
    }
}

export const deleteSubTask = (id) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/'
        dispatch(removeSubTask(id))
        axios.delete(DETAIL_URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).catch(() => errorFunction())
    }
}

export const changeSubTask = (id, args) => {
    return {
        type: actionTypes.CHANGE_SUBTASK,
        id: id,
        args: args
    }
}

export const editSubTask = (id, title) => {
    return dispatch => {
        dispatch(changeSubTask(id, {
            title: title
        }))
        const DETAIL_URL = URL + id + "/"
        axios.patch(DETAIL_URL, {
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).catch(() => errorFunction())
    }
}

export const completeSubTask = (id) => {
    return dispatch => {
        dispatch(changeSubTask(id, {
            completed: true
        }))
        const DETAIL_URL = URL + id + '/complete/';
        axios.put(DETAIL_URL, {}, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).catch(() => errorFunction())
    }
}

export const uncompleteSubTask = (id) => {
    return dispatch => {
        dispatch(changeSubTask(id, {
            completed: false
        }))
        const DETAIL_URL = URL + id + '/uncomplete/';
        axios.put(DETAIL_URL, {}, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).catch(() => errorFunction())
    }
}