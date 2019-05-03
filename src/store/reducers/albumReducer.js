import actionTypes from '../../store/actions/actionTypes'

export default (state={}, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_ALBUMS:
      return {
        ...state,
        albumList: action.payload
      }
    default:
      return state
  }
}