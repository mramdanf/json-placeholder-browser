import actionTypes from '../../store/actions/actionTypes'

export default (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        postList: action.payload,
      }
    case actionTypes.SET_POST_DETAIL:
      return {
        ...state,
        postDetail: action.payload,
      }
    default:
      return state
  }
}