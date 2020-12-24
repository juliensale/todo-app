import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    tasks: []
}

const setTasks = (state, action) => {
    return updateObject(state, {
        tasks: action.tasks
    })
}

const addTask = (state, action) => {
    var tasks = [...state.tasks]
    tasks.push(action.task)
    return updateObject(state, {
        tasks: tasks
    })
}

const removeTask = (state, action) => {
    var tasks = [...state.tasks]
    const index = tasks.findIndex(task => task.id === action.id)
    tasks.splice(index, 1)
    return updateObject(state, {
        tasks: tasks
    })
}

const changeTask = (state, action) => {
    var tasks = [...state.tasks]
    const modified_task = {
        id: action.id,
        sublist: action.sublist,
        title: action.title,
        completed: action.completed
    }
    const index = tasks.findIndex(task => task.id === action.id)
    tasks[index] = modified_task
    return updateObject(state, {
        tasks: tasks
    })
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS: return setTasks(state, action);
        case actionTypes.ADD_TASK: return addTask(state, action);
        case actionTypes.REMOVE_TASK: return removeTask(state, action);
        case actionTypes.CHANGE_TASK: return changeTask(state, action);
        default:
            return state;
    }
};

export default taskReducer;