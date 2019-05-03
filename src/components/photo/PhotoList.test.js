import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../appUtils'
import PhotoList, { UnconnectedPhotoList } from './PhotoList'

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

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return shallow(<PhotoList store={store} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ photo: { photoList } })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-photo-list')
    expect(component.length).toBe(1)
  })
  test('renders correct number of album photos', () => {
    const photoCardNodes = findByTestAttr(wrapper, 'photo-card')
    expect(photoCardNodes.length).toBe(photoList.length)
  })
})
test('calls getAlbumPhotos on app mounted with albumId as arguments', () => {
  const getAlbumPhotosMock = jest.fn()
  const props = {
    getAlbumPhotos: getAlbumPhotosMock,
    match: { params: { id: 1 } }
  }
  const wrapper = shallow(<UnconnectedPhotoList {...props} />)

  wrapper.instance().componentDidMount()

  expect(getAlbumPhotosMock.mock.calls[0][0]).toBe(props.match.params.id)
})
