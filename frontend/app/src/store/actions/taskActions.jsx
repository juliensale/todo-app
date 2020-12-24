import axios from "axios";
import * as actionTypes from "./actionTypes"
import API_URL from "./apiUrl"
import { changeSubList } from "./sublistActions";

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

export const createTask = (sublist, title) => {
    return dispatch => {
        axios.post(URL, {
            sublist: sublist,
            title: title
        }, {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        }).then(res => {
            const task = res.data;
            dispatch(addTask(task))
        }).catch(err => console.log(err))
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
        DETAIL_URL = URL + id + '/'
        axios.delete(DETAIL_URL, {
            headers: {
                Authorization: "Token " + localStorage.getItem("token")
            }
        }).then(res => {
            dispatch(removeTask(id))
        }).catch(err => console.log(err))
    }
}

export const changeTask = (id, sublist, title, completed) => {
    return {
        type: actionTypes.CHANGE_TASK,
        id: id,
        sublist: sublist,
        title: title,
        completed: completed
    }
}

export const editTask = (id, title) => {
    return dispatch => {
        DETAIL_URL = URL + id + "/"
        axios.patch(DETAIL_URL, {
            title: title
        }).then(res => {
            const { id, sublist, title, completed } = res.data;
            dispatch(changeTask(id, sublist, title, completed))
        }).catch(err => console.log(err))
    }
}