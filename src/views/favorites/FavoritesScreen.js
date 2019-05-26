/** Import modules **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Platform, FlatList, Text, DeviceEventEmitter } from 'react-native'

/** Import Constants **/
import Routes from '../../constants/routes/routes'
import StringsConstants from '../../constants/strings/strings'
import styles from './style'

/** Import Components **/
import ItemPost from '../../components/itemPost/ItemPost'
import Toast from '../../components/toast/Toast'

/** Import actions **/
import { navigationAction } from '../../actions/navigation'
import { loadingPostsAction, setUnreadStateAction } from '../../actions/posts'
import { cleanDetailPostAction } from '../../actions/detailPost'

/**
 * Class to export favorite view
 *
 * @class FavoritesScreen
 * @extends {Component}
 */
class FavoritesScreen extends Component {
  /**
   * Creates an instance of FavoritesScreen.
   * @param {*} props
   * @memberof FavoritesScreen
   */
  constructor(props) {
    super(props)
    this._setParamsNavigation()
    let favorites = []
    if (this.props.posts.data.length > 0) {
      favorites = this.props.posts.data.filter(item => item.favorite)
    }
    this.state = {
      data: favorites,
    }
  }

  /**
   * Function to add event listener
   *
   * @memberof FavoritesScreen
   */
  componentWillMount() {
    DeviceEventEmitter.addListener('updateFavorites', () => {
      this.setState({ data: this.props.posts.data.filter(item => item.favorite) })
    })
  }

  /**
   * Default options to navigation
   *
   * @static
   * @memberof FavoritesScreen
   */
  static navigationOptions = ({ navigation }) => {
    return navigation.state.params
      ? navigation.state.params
      : {
          title: Platform.OS === 'ios' ? StringsConstants.tabFavorites : StringsConstants.tabFavorites.toUpperCase(),
          swipeEnabled: false,
        }
  }

  /**
   * Set params to navigation
   *
   * @memberof FavoritesScreen
   */
  _setParamsNavigation = () => {
    this.props.navigation.setParams({
      tabBarOnPress: this._handleTabBarOnPress,
      title: StringsConstants.tabFavorites,
      swipeEnabled: false,
    })
  }

  /**
   * Handle onPress tab
   *
   * @memberof FavoritesScreen
   */
  _handleTabBarOnPress = () => {
    this.props.navigationAction(Routes.favoritesScreen, this.props.navigation)
    if (this.props.posts.data.length > 0) {
      this.setState({ data: this.props.posts.data.filter(item => item.favorite) })
    }
  }

  /**
   * Return an id to each view
   *
   * @memberof FavoritesScreen
   */
  keyExtractor = item => {
    return `${item.id}`
  }

  /**
   * Render item
   *
   * @memberof FavoritesScreen
   */
  renderItem = ({ item, index }) => (
    <ItemPost
      item={item}
      index={index}
      toast={this.refs.toast}
      navigation={this.props.navigation}
      reloadFavorites={() => {
        let favorites = []
        if (this.props.posts.data.length > 0) {
          favorites = this.props.posts.data.filter(item => item.favorite)
        }
        this.setState({
          data: favorites,
        })
      }}
    />
  )

  /**
   * Render emtpy component
   *
   * @memberof FavoritesScreen
   */
  renderEmpty = () => {
    return this.state.data && this.state.data.length > 0 ? null : (
      <View style={styles.containerEmpty}>
        <Text style={styles.containerTextEmpty}>¡Vaya¡, no hay información para mostrarte.</Text>
      </View>
    )
  }

  /**
   * Render favorite view
   *
   * @returns
   * @memberof FavoritesScreen
   */
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flexOne}
          data={this.state.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderEmpty()}
        />
        <Toast ref={StringsConstants.toast} style={StringsConstants.alertToast} />
      </View>
    )
  }
}

const mapDispatchToProps = { navigationAction, loadingPostsAction, setUnreadStateAction, cleanDetailPostAction }

const mapStateToProps = state => ({
  posts: state.posts,
})

/** Export component FavoritesScreen **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesScreen)
