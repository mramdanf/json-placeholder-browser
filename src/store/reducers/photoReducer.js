import actionTypes from '../../store/actions/actionTypes'

export default (state={}, action) => {
  switch(action.type) {
    case actionTypes.SET_ALBUM_PHOTOS:
      return {
        ...state,
        photoList: action.payload
      }
    default:
      return state
  }
}