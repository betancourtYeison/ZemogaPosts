/** Import modules **/
import { handleActions } from 'redux-actions'
import {
  LOADING_POSTS,
  SET_POSTS,
  SET_UNREAD_STATE,
  SET_FAVORITE_STATE,
  DELETE_POST,
  CLEAN_POSTS,
} from './../actions/types'

export const posts = handleActions(
  {
    [LOADING_POSTS]: (state, action) => {
      const { value } = action.payload
      return {
        loading: value,
        data: state.data,
      }
    },
    [SET_POSTS]: (state, action) => {
      const { data } = action.payload
      let nextState = null
      if (data.length > 0) {
        nextState = {
          loading: false,
          data: data.map((item, index) => {
            return { ...item, ...{ favorite: false, unread: index < 20 ? true : false } }
          }),
        }
      } else {
        nextState = {
          loading: false,
          data: [],
        }
      }
      return nextState
    },
    [SET_UNREAD_STATE]: (state, action) => {
      const { post, value } = action.payload
      const index = state.data.findIndex(item => item.id === post.id)
      let nextState = {
        loading: false,
        data: state.data.map((item, dataIndex) => {
          return dataIndex === index ? { ...item, ...{ unread: value } } : { ...item }
        }),
      }
      return nextState
    },
    [SET_FAVORITE_STATE]: (state, action) => {
      const { post } = action.payload
      const index = state.data.findIndex(item => item.id === post.id)
      let nextState = {
        loading: false,
        data: state.data.map((item, dataIndex) => {
          return dataIndex === index ? { ...item, ...{ favorite: !item.favorite } } : { ...item }
        }),
      }
      return nextState
    },
    [DELETE_POST]: (state, action) => {
      const { post } = action.payload
      const index = state.data.findIndex(item => item.id === post.id)
      let nextState = {
        loading: false,
        data: state.data.filter((item, dataIndex) => {
          return dataIndex !== index
        }),
      }
      return nextState
    },
    [CLEAN_POSTS]: (state, action) => {
      return {
        loading: false,
        data: [],
      }
    },
  },
  {
    loading: true,
    data: [],
  }
)
