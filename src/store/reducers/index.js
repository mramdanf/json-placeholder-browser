import { combineReducers } from 'redux'
import user from './userReducer'
import post from './postReducer'
import album from './albumReducer'
import photo from './photoReducer'

export default combineReducers({
  user,
  post,
  album,
  photo,
})