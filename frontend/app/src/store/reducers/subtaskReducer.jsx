import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    subtasks: []
}

const setSubTasks = (state, action) => {
    return updateObject(state, {
        subtasks: action.subtasks
    })
}

const addSubTask = (state, action) => {
    var subtasks = [...state.subtasks]
    subtasks.push(action.subtask)
    return updateObject(state, {
        subtasks: subtasks
    })
}

const changeSubTaskComplete = (state, action) => {
    var subtasks = [...state.subtasks]
    const index = subtasks.findIndex(subtask => subtask.id === action.id)
    subtasks[index] = action.subtask
    return updateObject(state, {
        sutasks: subtasks
    })
}

const removeSubTask = (state, action) => {
    var subtasks = [...state.subtasks]
    const index = subtasks.findIndex(subtask => subtask.id === action.id)
    subtasks.splice(index, 1)
    return updateObject(state, {
        subtasks: subtasks
    })
}

const changeSubTask = (state, action) => {
    var subtasks = [...state.subtasks]
    const index = subtasks.findIndex(subtask => subtask.id === action.id)
    const modified_subtask = {
        ...subtasks[index],
        ...action.args
    }
    subtasks[index] = modified_subtask
    return updateObject(state, {
        subtasks: subtasks
    })
}

const subTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SUBTASKS: return setSubTasks(state, action);
        case actionTypes.ADD_SUBTASK: return addSubTask(state, action);
        case actionTypes.CHANGE_SUBTASK_COMPLETE: return changeSubTaskComplete(state, action);
        case actionTypes.REMOVE_SUBTASK: return removeSubTask(state, action);
        case actionTypes.CHANGE_SUBTASK: return changeSubTask(state, action);
        default:
            return state;
    }
};

export default subTaskReducer;