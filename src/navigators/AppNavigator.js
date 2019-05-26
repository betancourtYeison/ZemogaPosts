/** Import modules **/
import React, { Component } from 'react'
import { BackHandler, Alert, AsyncStorage, Platform, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'

/** Import views **/
import PostsScreen from '../views/posts/PostsScreen'
import FavoritesScreen from '../views/favorites/FavoritesScreen'
import DetailPostScreen from '../views/detailPost/DetailPostScreen'

/** Import constants **/
import Colors from './../constants/styles/colors'
import Routes from './../constants/routes/routes'
import StringsConstants from './../constants/strings/strings'

/** Import actions **/
import { backNavigationAction } from './../actions/navigation'

/** Import components **/
import ButtonReload from './../components/buttonReload/ButtonReload'
import ButtonStar from './../components/buttonStar/ButtonStar'

/** Create const to dimension **/
const DEVICE_WIDTH = Dimensions.get('window').width

const TAB_BAR_OPTIONS =
  Platform.OS === 'ios'
    ? {
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.greenBlue,
        style: {
          backgroundColor: Colors.white,
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 30,
          borderWidth: 1,
          borderColor: Colors.greenBlue,
          width: DEVICE_WIDTH - 60,
          justifyContent: 'center',
        },
        tabStyle: {
          width: DEVICE_WIDTH / 2 - 30,
        },
        labelStyle: {
          textAlign: 'center',
          height: 16,
          fontSize: 14,
          margin: 0,
        },
        indicatorStyle: {
          borderBottomWidth: 0,
          height: '100%',
          backgroundColor: Colors.greenBlue,
        },
        upperCaseLabel: false,
      }
    : {
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.veryLightPink,
        style: {
          backgroundColor: Colors.greenBlue,
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: Colors.veryLightPink,
          borderBottomWidth: 2,
        },
      }

const HomeTopTabNavigator = createMaterialTopTabNavigator(
  {
    PostsScreen: { screen: PostsScreen },
    FavoritesScreen: { screen: FavoritesScreen },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: TAB_BAR_OPTIONS,
  }
)

const RootNavigator = createStackNavigator(
  {
    HomeTopTabNavigator: {
      screen: HomeTopTabNavigator,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Colors.greenBlue,
        },
        headerTintColor: Colors.white,
        title: 'Posts',
        headerRight: <ButtonReload />,
      },
    },
    DetailPostScreen: {
      screen: DetailPostScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Colors.greenBlue,
        },
        headerTintColor: Colors.white,
        title: Platform.OS === 'ios' ? 'Post' : null,
        headerRight: <ButtonStar />,
      },
    },
  },
  {
    initialRouteName: 'HomeTopTabNavigator',
    headerMode: 'screen',
    headerBackTitleVisible: false,
  }
)

const AppContainer = createAppContainer(RootNavigator)

const persistenceKey = StringsConstants.persistenceKey

const persistNavigationState = async navState => {
  try {
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
  } catch (err) {
    // handle the error according to your needs
  }
}

const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey)
  return JSON.parse(jsonString)
}

/** create nav component **/
class ReduxNavigation extends Component {
  /**
   * Function to add back handler event to Android
   *
   * @memberof ReduxNavigation
   */
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const { nav } = this.props
      const { index, routes } = nav
      const route = routes[index]
      if (route.routeName === Routes.postsScreen || route.routeName === Routes.app) {
        Alert.alert(
          StringsConstants.exitApp,
          StringsConstants.exitAppMessage,
          [
            {
              text: StringsConstants.cancel,
              onPress: () => {},
              style: 'cancel',
            },
            { text: StringsConstants.yes, onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        )
        return true
      } else if (route.routeName !== Routes.registerTypePhoneScreen) {
        this.props.backNavigationAction()
        return false
      } else {
        return true
      }
    })
  }

  /**
   * Function to remove back handler event to Android
   *
   * @memberof ReduxNavigation
   */
  componentWillUnmount() {
    this.backHandler.remove()
  }

  /**
   * Remder App Navigation
   *
   * @returns
   * @memberof ReduxNavigation
   */
  render() {
    return <AppContainer persistNavigationState={persistNavigationState} loadNavigationState={loadNavigationState} />
  }
}

const mapDispatchToProps = { backNavigationAction }

const mapStateToProps = state => ({
  nav: state.nav,
})

const AppNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxNavigation)

/** Export component RootNavigator, AppNavigator and middleware **/
export { RootNavigator, AppNavigator }
