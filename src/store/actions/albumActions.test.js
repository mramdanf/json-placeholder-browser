import moxios from 'moxios'

import { storeFactory } from '../../appUtils';
import { getUserAlbums } from './albumActions'

describe('album actions creator', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('adds reponse albumList to state when getUserAlbums action creator called', () => {
    const userId = 1
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
    const store = storeFactory()

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: albumList
      })
    })

    return store.dispatch(getUserAlbums(userId))
      .then(() => {
        const newState = store.getState()
        expect(newState.album.albumList).toEqual(albumList)
      })
  })
})