import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../../appUtils'
import { NonHocPhotoCard } from './PhotoCard'

const defaultProps = {
  photo: {
    id: 51,
    title: "non sunt voluptatem placeat consequuntur rem incidunt",
    thumbnailUrl: "https://via.placeholder.com/150/8e973b"
  }
}

const setup = (initialProps={}) => {
  const setupProps = { ...defaultProps, ...initialProps }
  return shallow(<NonHocPhotoCard {...setupProps} />)
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-photo-card')
    expect(component.length).toBe(1)
  })
  test('renders photo thumbnail', () => {
    const component = findByTestAttr(wrapper, 'component-photo-card')
    const cover = component.prop('cover')
    expect(cover).not.toBe(undefined)
  })
  test('renders photo title', () => {
    const photoTitle = findByTestAttr(wrapper, 'photo-title')
    expect(photoTitle.text().length).not.toBe(0)
  })
  test('renders view photo detail', () => {
    const component = findByTestAttr(wrapper, 'component-photo-card')
    const actions = component.prop('actions')
    const viewPhotoDetailBtn = actions.find(action => (
      action.props.children.props['data-test'] === 'view-photo-detail'
    ))
    expect(viewPhotoDetailBtn).not.toBe(undefined)
  })
})
test('does not throw warning with expected props', () => {
  checkProps(NonHocPhotoCard, defaultProps)
})
test('calls photo detail pages when view detail photo button clicked', () => {
  const props = {
    history: []
  }
  const wrapper = setup(props)

  const component = findByTestAttr(wrapper, 'component-photo-card')
  const actions = component.prop('actions')
  const viewPhotoDetailBtn = actions.find(action => (
    action.props.children.props['data-test'] === 'view-photo-detail'
  ))
  viewPhotoDetailBtn.props.children.props['onClick']()

  expect(wrapper.instance().props.history[0]).toBe(`photo-detail/${defaultProps.photo.id}`)
})