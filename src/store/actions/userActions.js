import axios from 'axios'

import actionTypes from './actionTypes'

export const getUserList = () => {
  return (dispatch) => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      dispatch({
        type: actionTypes.SET_USER_LIST,
        payload: response.data
      })
    })
  }
}