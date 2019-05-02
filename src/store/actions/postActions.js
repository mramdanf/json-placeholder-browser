import axios from 'axios'
import actionTypes from '../../store/actions/actionTypes'

export const getUserPosts = (user) => {
  return (dispatch) => {
    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
      .then(response => {
        dispatch({
          type: actionTypes.SET_USER_POSTS,
          payload: response.data
        })
      })
  }
}