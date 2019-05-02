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

export const deletePost = (postId) => {
  return (dispatch, getState) => {
    const post = getState().post.postList
    return axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (response.status == 200) {
          const newPosts = post.filter(post => post.id !== postId)
          dispatch({
            type: actionTypes.SET_USER_POSTS,
            payload: newPosts
          })
        }
      })
  }
}