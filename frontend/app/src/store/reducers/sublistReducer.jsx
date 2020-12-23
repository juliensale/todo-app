import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    sublists: []
}


const setSubLists = (state, action) => {
    return updateObject(state, {
        sublists: action.sublists
    })
}

const addSubList = (state, action) => {
    let sublists = [...state.sublists];
    sublists.push(action.sublist)

    return updateObject(state, {
        sublists: sublists
    })
}

const removeSubList = (state, action) => {
    let sublists = [...state.sublists];
    const index = sublists.findIndex(list => list.id === action.id)
    sublists.splice(index, 1)

    return updateObject(state, {
        sublists: sublists
    })
}

const changeSubList = (state, action) => {
    let sublists = [...state.sublists];
    const index = sublists.findIndex(list => list.id === action.id);
    sublists[index].title = action.title

    return updateObject(state, {
        sublists: sublists
    })
}

const sublistReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SUBLISTS: return setSubLists(state, action);
        case actionTypes.ADD_SUBLIST: return addSubList(state, action);
        case actionTypes.REMOVE_SUBLIST: return removeSubList(state, action);
        case actionTypes.CHANGE_SUBLIST: return changeSubList(state, action);

        default:
            return state;
    }
};

export default sublistReducer;