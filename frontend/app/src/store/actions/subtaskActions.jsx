import axios from "axios";
import * as actionTypes from "./actionTypes"
import API_URL from "./apiUrl"

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

export const createSubTask = (task, title) => {
    return dispatch => {
        axios.post(URL, {
            task: task,
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const subtask = res.data;
            dispatch(addSubTask(subtask))
        }).catch(err => console.log(err))
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
        axios.delete(DETAIL_URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).then(res => {
            dispatch(removeSubTask(id))
        }).catch(err => console.log(err))
    }
}

export const changeSubTask = (id, task, title, completed) => {
    return {
        type: actionTypes.CHANGE_SUBTASK,
        id: id,
        task: task,
        title: title,
        completed: completed
    }
}

export const editSubTask = (id, title) => {
    return dispatch => {
        const DETAIL_URL = URL + id + "/"
        axios.patch(DETAIL_URL, {
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).then(res => {
            const { id, task, title, completed } = res.data;
            dispatch(changeSubTask(id, task, title, completed))
        }).catch(err => console.log(err))
    }
}

export const completeSubTask = (id) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/complete/';
        axios.put(DETAIL_URL, {}, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).then(res => {
            const { id, task, title, completed } = res.data;
            dispatch(changeSubTask(id, task, title, completed))
        }).catch(err => console.log(err))
    }
}

export const uncompleteSubTask = (id) => {
    return dispatch => {
        const DETAIL_URL = URL + id + '/uncomplete/';
        axios.put(DETAIL_URL, {}, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        })
            .then(res => {
                const { id, task, title, completed } = res.data;
                dispatch(changeSubTask(id, task, title, completed))
            }).catch(err => console.log(err))
    }
}