import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../appUtils'
import AlbumList, { UnconnectedAlbumList } from './AlbumList'

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

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return shallow(<AlbumList store={store} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ album: { albumList } })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-album-list')
    expect(component.length).toBe(1)
  })
  test('renders correct number of user albums', () => {
    const albumCardNodes = findByTestAttr(wrapper, 'album-card')
    expect(albumCardNodes.length).toBe(albumList.length)
  })
})
test('calls `getUserAlbum` on app mounted with userId as argumets', () => {
  const getUserAlbumsMock = jest.fn()
  const props = {
    getUserAlbums: getUserAlbumsMock,
    albumList,
    match: { params: { id: 1 } },
  }
  const wrapper = shallow(<UnconnectedAlbumList {...props} />)

  wrapper.instance().componentDidMount()

  expect(getUserAlbumsMock.mock.calls[0][0]).toBe(props.match.params.id)

})