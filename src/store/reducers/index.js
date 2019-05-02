import { combineReducers } from 'redux'
import user from './userReducer'
import post from './postReducer'

export default combineReducers({
  user,
  post,
})