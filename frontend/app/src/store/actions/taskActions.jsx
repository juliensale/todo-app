import axios from "axios";
import * as actionTypes from "./actionTypes"
import API_URL from "./apiUrl"
import errorFunction from "./errorFunction"

const URL = API_URL + 'todo/tasks/'

export const setTasks = (tasks) => {
    return {
        type: actionTypes.SET_TASKS,
        tasks: tasks
    }
}

export const updateTasks = () => {
    return dispatch => {
        axios.get(URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const tasks = res.data;
            dispatch(setTasks(tasks))
        }).catch(err => console.log(err))
    }
}

export const addTask = (task) => {
    return {
        type: actionTypes.ADD_TASK,
        task: task
    }
}

export const changeTaskComplete = (id, task) => {
    return {
        type: actionTypes.CHANGE_TASK_COMPLETE,
        id: id,
        task: task
    }
}

export const createTask = (sublist, title) => {
    return dispatch => {
        dispatch(addTask({
            id: -1,
            sublist: sublist,
            title: title,
            completed: false
        }))

        axios.post(URL, {
            sublist: sublist,
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const task = res.data;
            dispatch(changeTaskComplete(-1, task))
        }).catch(() => errorFunction())
    }
}

export const removeTask = (id) => {
    return {
        type: actionTypes.REMOVE_TASK,
        id: id
    }
}

export const deleteTask = (id) => {
    return dispatch => {
        dispatch(removeTask(id))
        const DETAIL_URL = URL + id + '/'
        axios.delete(DETAIL_URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).catch(() => errorFunction())
    }
}

export const changeTask = (id, args) => {
    return {
        type: actionTypes.CHANGE_TASK,
        id: id,
        args: args
    }
}

export const editTask = (id, title) => {
    return dispatch => {
        dispatch(changeTask(id, {
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

export const completeTask = (id) => {
    return dispatch => {
        dispatch(changeTask(id, {
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

export const uncompleteTask = (id) => {
    return dispatch => {
        dispatch(changeTask(id, {
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