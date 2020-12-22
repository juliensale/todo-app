import { combineReducers } from "redux"
import authReducer from './authReducers'
import listReducer from './listReducer'

const rootReducer = combineReducers({
    authentication: authReducer,
    lists: listReducer

})

export default rootReducer