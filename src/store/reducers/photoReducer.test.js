import actionTypes from '../../store/actions/actionTypes'
import photoReducer from './photoReducer'

test('returns default initial state of {} when no action is passed', () => {
  const newState = photoReducer(undefined, {})
  expect(newState).toEqual({})
})
test('returns { photoList: [...] } when receiving action of type `SET_ALBUM_PHOTOS`', () => {
  const photoList = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    },
    {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796"
    },
  ]
  
  const action = {
    type: actionTypes.SET_ALBUM_PHOTOS,
    payload: photoList,
  }

  const newState = photoReducer(undefined, action)
  expect(newState.photoList).toEqual(photoList)
})
test('returns photo detail when receiving action of type `SET_PHOTO_DETAIL`', () => {
  const action = {
    type: actionTypes.SET_PHOTO_DETAIL,
    payload: {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    }
  }
  const newState = photoReducer(undefined, action)
  expect(newState).toEqual({ photoDetail: action.payload })
})