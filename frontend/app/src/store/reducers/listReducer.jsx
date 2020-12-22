import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    lists: []
}

const setLists = (state, action) => {
    return updateObject(state, {
        lists: action.lists
    })
}

const addList = (state, action) => {
    var lists = [...state.lists];
    lists.push(action.list)

    return updateObject(state, {
        lists: lists
    })
}

const removeList = (state, action) => {
    var lists = [...state.lists];
    const id = action.id;
    const index = lists.findIndex(list => list.id === id);
    lists.splice(index, 1)

    return updateObject(state, {
        lists: lists
    })
}

const changeList = (state, action) => {
    var lists = [...state.lists];
    const modified_list = {
        id: action.id,
        title: action.title,
        color: action.color
    };
    const index = lists.findIndex(list => list.id === action.id);
    lists[index] = modified_list;

    return updateObject(state, {
        lists: lists
    })
}


const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LISTS: return setLists(state, action);
        case actionTypes.ADD_LIST: return addList(state, action);
        case actionTypes.REMOVE_LIST: return removeList(state, action);
        case actionTypes.CHANGE_LIST: return changeList(state, action);
        default:
            return state;
    }
};

export default listReducer;