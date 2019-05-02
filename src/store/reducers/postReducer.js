import actionTypes from '../../store/actions/actionTypes'

export default (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        postList: action.payload
      }
    default:
      return state
  }
}