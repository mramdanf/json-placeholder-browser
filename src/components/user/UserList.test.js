import React from 'react'
import { shallow } from 'enzyme'

import UserList, { UnconnectedUserList } from './UserList'
import { findByTestAttr, storeFactory } from '../../appUtils'

const defaultState = {
  user: {
    userList: [{
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618"
        }
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains"
      }
    }]
  }
}

const setup = (initialState={}) => {
  const setupState = { ...defaultState, ...initialState }
  const store = storeFactory(setupState)
  return shallow(<UserList store={store} />).dive()
}

describe('renders', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })
  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-user-list')
    expect(component.length).toBe(1)
  })
  test('renders correct number of user list', () => {
    const userNodes = findByTestAttr(wrapper, 'user-list')
    expect(userNodes.length).toBe(defaultState.user.userList.length)
  })
})
test('calls `getUserList` on app mount', () => {
  const getUserListMock = jest.fn()
  const props = {
    getUserList: getUserListMock,
    userList: defaultState.user.UserList
  }
  const wrapper = shallow(<UnconnectedUserList {...props} />)

  wrapper.instance().componentDidMount()

  expect(getUserListMock.mock.calls.length).toBe(1)
})