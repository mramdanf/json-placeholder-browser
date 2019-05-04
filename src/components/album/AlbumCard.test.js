import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../appUtils'
import { NonHocAlbumCard } from './AlbumCard'

const defaultProps = {
  album: {
    id: 1,
    title: "quidem molestiae enim",
  }
}

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<NonHocAlbumCard {...setupProps} />)
}

describe('renders', () => {
  let wrapper                           
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-album-card')
    expect(component.length).toBe(1)
  })
  test('renders album title', () => {
    const albumTitle = findByTestAttr(wrapper, 'album-title')
    expect(albumTitle.text().length).not.toBe(0)
  })
  test('renders view detail album button', () => {
    const componentAlbumCard = findByTestAttr(wrapper, 'component-album-card')
    const actions = componentAlbumCard.prop('actions')
    const viewDetailBtn = actions.filter(action => {
      return action.props.children.props['data-test'] === 'photos-of-album'
    })
    expect(viewDetailBtn).not.toBe(undefined)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(NonHocAlbumCard, defaultProps)
})
test('go to photos page when photos of album clicked', () => {
  const props = {
    history: [],
  }
  const wrapper = setup(props)

  const componentAlbumCard = findByTestAttr(wrapper, 'component-album-card')
  const actions = componentAlbumCard.prop('actions')
  const photosOfAlbumBtn = actions.find(action => {
    return action.props.children.props['data-test'] == 'photos-of-album'
  })
  photosOfAlbumBtn.props.children.props['onClick']()

  expect(wrapper.instance().props.history[0]).toBe(`/album-photos/${defaultProps.album.id}`)

})
