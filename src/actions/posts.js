import { LOADING_POSTS, SET_POSTS, SET_UNREAD_STATE, SET_FAVORITE_STATE, DELETE_POST, CLEAN_POSTS } from './types'
import { createAction } from 'redux-actions'

export const loadingPostsAction = createAction(LOADING_POSTS, value => {
  return {
    value,
  }
})

export const setPostsAction = createAction(SET_POSTS, data => {
  return {
    data,
  }
})

export const setUnreadStateAction = createAction(SET_UNREAD_STATE, (post, value) => {
  return {
    post,
    value,
  }
})

export const setFavoriteStateAction = createAction(SET_FAVORITE_STATE, post => {
  return {
    post,
  }
})

export const deletePostAction = createAction(DELETE_POST, post => {
  return {
    post,
  }
})

export const cleanPostsAction = createAction(CLEAN_POSTS)
