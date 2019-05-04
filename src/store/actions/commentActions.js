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

export const deleteComment = (commentId) => {
  return (dispatch, getState) => {
    return axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then(response => {
        if (response.status === 200) {
          const newCommentList = getState().comment.commentList.filter(
            comment => comment.id !== commentId
          )
          dispatch({
            type: actionTypes.SET_POST_COMMENTS,
            payload: newCommentList,
          })
        }
      })
  }
}

export const getCommentDetail = (commentId) => {
  return (dispatch) => {
    return axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
      .then(response => {
        dispatch({
          type: actionTypes.SET_COMMENT_DETAIL,
          payload: response.data,
        })
      })
  }
}

export const addComment = (newComment) => {
  return (dispatch, getState) => {
    return axios.post(`https://jsonplaceholder.typicode.com/comments/`, newComment, {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: actionTypes.SET_POST_COMMENTS,
          payload: [
            ...getState().comment.commentList,
            response.data,
          ]
        })
      }
    })
  }
}

export const editComment = (newComment, commentId) => {
  return (dispatch, getState) => {
    return axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, newComment, {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SET_POST_COMMENTS,
            payload: [
              ...getState().comment.commentList.filter(comment => comment.id !== commentId),
              response.data,
            ]
          })
        }
      })
  }
}