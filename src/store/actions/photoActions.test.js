import moxios from 'moxios'

import { storeFactory } from '../../appUtils'
import { getAlbumPhotos } from './photoActions'

describe('photo action creator', () => {
  beforeEach(() => {
    moxios.install()
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

    const store = storeFactory()
    const albumId = 1

    return store.dispatch(getAlbumPhotos(albumId))
      .then(response => {
        const newState = store.getState()
        expect(newState.photo.photoList).toEqual(photoList)
      })
  })
})