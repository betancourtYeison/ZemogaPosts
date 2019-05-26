/** Import modules **/
import { handleActions } from 'redux-actions'
import { CHANGE_VIEW, BACK_VIEW } from './../actions/types'
import { RootNavigator } from '../navigators/AppNavigator'

/** Import Constants **/
import Routes from '../constants/routes/routes'

export const nav = handleActions(
  {
    [CHANGE_VIEW]: (state, action) => {
      const { routeName, navigation, params } = action.payload
      const { navigate } = navigation
      const rootRouter = RootNavigator.router
      const homeTopTabNavigatorRouter = rootRouter.childRouters[Routes.homeTopTabNavigator]
      let actionToState = rootRouter.getActionForPathAndParams(routeName)
      let nextState
      if (actionToState) {
        nextState = RootNavigator.router.getStateForAction(actionToState)
      } else if (homeTopTabNavigatorRouter && homeTopTabNavigatorRouter.getActionForPathAndParams(routeName)) {
        actionToState = homeTopTabNavigatorRouter.getActionForPathAndParams(routeName)
        nextState = homeTopTabNavigatorRouter.getStateForAction(actionToState)
      }
      let lastRoute = navigation.state
      if (routeName === Routes.postsScreen) {
        lastRoute = null
      } else if (state.lastRoute && state.lastRoute.key !== lastRoute.key) {
        lastRoute['lastRoute'] = {
          key: state.lastRoute.key,
          routeName: state.lastRoute.routeName,
        }
      } else if (routeName === Routes.favoritesScreen) {
        lastRoute = {
          key: Routes.postsScreen,
          routeName: Routes.postsScreen,
        }
      }
      navigate(routeName, params)
      return { ...nextState, ...{ lastRoute } } || state
    },
    [BACK_VIEW]: state => {
      if (!state.lastRoute) {
        return state
      }
      let { routeName, lastRoute } = state.lastRoute
      const rootRouter = RootNavigator.router
      const homeTopTabNavigatorRouter = RootNavigator.router.childRouters[Routes.homeTopTabNavigator]
      let actionToState = rootRouter.getActionForPathAndParams(routeName)
      let nextState
      if (actionToState) {
        nextState = RootNavigator.router.getStateForAction(actionToState)
      } else if (homeTopTabNavigatorRouter && homeTopTabNavigatorRouter.getActionForPathAndParams(routeName)) {
        actionToState = homeTopTabNavigatorRouter.getActionForPathAndParams(routeName)
        nextState = homeTopTabNavigatorRouter.getStateForAction(actionToState)
      }
      if (routeName === Routes.postsScreen) {
        lastRoute = null
      }
      return { ...nextState, ...{ lastRoute } } || state
    },
  },
  {
    index: 0,
    routes: [{ key: 'PostsScreen', routeName: 'PostsScreen' }],
  }
)
