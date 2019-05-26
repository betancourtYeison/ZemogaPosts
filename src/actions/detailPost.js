import { SET_DETAIL_POST, CLEAN_DETAIL_POST } from './types'
import { createAction } from 'redux-actions'

export const setDetailPostAction = createAction(SET_DETAIL_POST, data => {
  return {
    data,
  }
})

export const cleanDetailPostAction = createAction(CLEAN_DETAIL_POST)
