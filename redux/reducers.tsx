import { combineReducers } from 'redux'
import userReducer from './userAuth/userAuthReducer'

export default combineReducers({
  userRes: userReducer
})