import { CHANGE_VIEW, BACK_VIEW } from './types'
import { createAction } from 'redux-actions'

export const navigationAction = createAction(CHANGE_VIEW, (routeName, navigation, params) => {
  return {
    routeName,
    navigation,
    params,
  }
})

export const backNavigationAction = createAction(BACK_VIEW)
