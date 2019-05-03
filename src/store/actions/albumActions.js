import axios from 'axios'

import actionTypes from '../../store/actions/actionTypes'

export const getUserAlbums = (userId) => {
  return (dispatch) => {
    return axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => {
        dispatch({
          type: actionTypes.SET_USER_ALBUMS,
          payload: response.data
        })
      })
  }
}
