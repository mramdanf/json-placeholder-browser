import moxios from 'moxios'

import { storeFactory } from '../../appUtils'
import { getAlbumPhotos, getPhotoDetail } from './photoActions'

describe('photo action creator', () => {
  let store
  beforeEach(() => {
    moxios.install()
    store = storeFactory()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('adds response albumPhotoList to state when getAlbumPhotos action creator called', () => {
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

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: photoList,
      })
    })

    const albumId = 1

    return store.dispatch(getAlbumPhotos(albumId))
      .then(response => {
        const newState = store.getState()
        expect(newState.photo.photoList).toEqual(photoList)
      })
  })
  test('adds response photoDetail to state when getPhotoDetail action creator called', () => {
    const photoDetail = {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952"
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: photoDetail
      })
    })

    return store.dispatch(getPhotoDetail(photoDetail.id))
      .then(response => {
        const newState = store.getState()
        expect(newState.photo.photoDetail).toEqual(photoDetail)
      })
  })
})