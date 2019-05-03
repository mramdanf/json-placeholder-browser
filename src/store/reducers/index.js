import { combineReducers } from 'redux'
import user from './userReducer'
import post from './postReducer'
import album from './albumReducer'

export default combineReducers({
  user,
  post,
  album,
})