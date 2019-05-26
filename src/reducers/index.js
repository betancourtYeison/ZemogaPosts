import { combineReducers } from 'redux'
import { nav } from './navigation'
import { posts } from './posts'
import { detailPost } from './detailPost'

export default combineReducers({
  nav,
  posts,
  detailPost,
})
