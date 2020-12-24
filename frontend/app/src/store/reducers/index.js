import { combineReducers } from "redux"
import authReducer from './authReducers'
import listReducer from './listReducer'
import sublistReducer from "./sublistReducer"
import taskReducer from "./taskReducer"

const rootReducer = combineReducers({
    authentication: authReducer,
    lists: listReducer,
    sublists: sublistReducer,
    tasks: taskReducer

})

export default rootReducer