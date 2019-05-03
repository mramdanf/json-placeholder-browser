import axios from "axios";
import actionTypes from '../../store/actions/actionTypes'

export const getAlbumPhotos = (albumId) => {
  return (dispatch) => {
    return axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then(response => {
        dispatch({
          type: actionTypes.SET_ALBUM_PHOTOS,
          payload: response.data
        })
      })
  }
}