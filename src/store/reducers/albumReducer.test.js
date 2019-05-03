import actionTypes from '../../store/actions/actionTypes'
import albumReducer from './albumReducer'

test('returns default initial state of {} when no action is passed', () => {
  const newState = albumReducer(undefined, {})
  expect(newState).toEqual({})
})
test('returns { albumList: [...] } when receiving an action type of `SET_USER_ALBUMS`', () => {
  const albumList = [
    {
      userId: 1,
      id: 1,
      title: "quidem molestiae enim"
    },
    {
      userId: 1,
      id: 2,
      title: "sunt qui excepturi placeat culpa"
    },
  ]
  const action = {
    type: actionTypes.SET_USER_ALBUMS,
    payload: albumList,
  }
  const newState = albumReducer(undefined, action)
  expect(newState.albumList).toEqual(albumList)
})