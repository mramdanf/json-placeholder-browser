import axios from 'axios'

import actionTypes from '../../store/actions/actionTypes'

export const getPostComments = (postId) => {
  return (dispatch) => {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => {
        dispatch({
          type: actionTypes.SET_POST_COMMENTS,
          payload: response.data,
        })
      })
  }
}