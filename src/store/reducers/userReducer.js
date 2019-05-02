import actionTypes from '../actions/actionTypes'
export default (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_USER_LIST:
      return {
        ...state,
        userList: action.payload.userList,
      }
    default:
      return state
  }
}