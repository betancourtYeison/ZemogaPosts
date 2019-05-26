/** Import modules **/
import { handleActions } from 'redux-actions'
import { SET_DETAIL_POST, SET_FAVORITE_STATE, CLEAN_DETAIL_POST } from './../actions/types'

export const detailPost = handleActions(
  {
    [SET_DETAIL_POST]: (state, action) => {
      const { data } = action.payload
      let nextState = { ...data }
      return nextState
    },
    [SET_FAVORITE_STATE]: (state, action) => {
      let nextState = { ...state, ...{ post: { ...state.post, ...{ favorite: !state.post.favorite } } } }
      return nextState
    },
    [CLEAN_DETAIL_POST]: (state, action) => {
      return {
        post: {},
        user: {},
        comments: [],
      }
    },
  },
  {
    post: {},
    user: {},
    comments: [],
  }
)
