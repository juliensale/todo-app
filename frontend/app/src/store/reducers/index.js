import { combineReducers } from "redux"
import authReducer from './authReducers'
import listReducer from './listReducer'
import sublistReducer from "./sublistReducer"

const rootReducer = combineReducers({
    authentication: authReducer,
    lists: listReducer,
    sublists: sublistReducer

})

export default rootReducer