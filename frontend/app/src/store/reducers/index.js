import { combineReducers } from "redux"
import authReducer from './AuthReducers'

const rootReducer = combineReducers({
    authentication: authReducer
})

export default rootReducer