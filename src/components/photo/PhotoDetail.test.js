import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, storeFactory } from '../../appUtils'
import PhotoDetail, { UnconnectedPhotoDetail } from './PhotoDetail'

const photoDetail = {
  albumId: 1,
  id: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952"
}

const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  return shallow(<PhotoDetail store={store} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({ photo: { photoDetail } })
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-photo-detail')
    expect(component.length).toBe(1)
  })
  test('renders photo', () => {
    const photo = findByTestAttr(wrapper, 'photo')
    const photoSrc = photo.prop('src')
    expect(photoSrc).not.toBe(undefined)
  })
  test('renders photo title', () => {
    const photoTitle = findByTestAttr(wrapper, 'photo-title')
    expect(photoTitle.text().length).not.toBe(0)
  })
})
test('calls getPhotoDetail on app mounted with photoId as argument', () => {
  const photoId = 1
  const getPhotoDetailMock = jest.fn()
  const props = {
    match: { params: { id: photoId } },
    getPhotoDetail: getPhotoDetailMock,
    photo: photoDetail,
  }
  const wrapper = shallow(<UnconnectedPhotoDetail {...props} />)

  wrapper.instance().componentDidMount()

  expect(getPhotoDetailMock.mock.calls[0][0]).toBe(props.match.params.id)
})