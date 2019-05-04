import actionTypes from '../../store/actions/actionTypes'

export default (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_POST_COMMENTS:
      return {
        ...state,
        commentList: action.payload,
      }
    case actionTypes.SET_COMMENT_DETAIL:
      return {
        ...state,
        commentDetail: action.payload,
      }
    default:
      return state
  }
}