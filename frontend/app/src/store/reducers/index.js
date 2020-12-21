import { combineReducers } from "redux"
import authReducer from './authReducers'

const rootReducer = combineReducers({
    authentication: authReducer
})

export default rootReducer