import { combineReducers } from "redux"
import authReducer from './authReducers'
import listReducer from './listReducer'
import sublistReducer from "./sublistReducer"
import taskReducer from "./taskReducer"
import subTaskReducer from "./subtaskReducer"

const rootReducer = combineReducers({
    authentication: authReducer,
    lists: listReducer,
    sublists: sublistReducer,
    tasks: taskReducer,
    subtasks: subTaskReducer

})

export default rootReducer