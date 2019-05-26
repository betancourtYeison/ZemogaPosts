/** Import modules **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Platform, FlatList, Text, TouchableOpacity } from 'react-native'

/** Import Constants **/
import Icons from './../../constants/icons/icons'
import Colors from './../../constants/styles/colors'
import Routes from '../../constants/routes/routes'
import StringsConstants from '../../constants/strings/strings'
import styles from './style'

/** Import Components **/
import LoaderWithoutModal from '../../components/loaderWithoutModal/LoaderWithoutModal'
import ItemPost from '../../components/itemPost/ItemPost'
import Toast, { DURATION } from '../../components/toast/Toast'

/** Import actions **/
import { navigationAction } from '../../actions/navigation'
import {
  loadingPostsAction,
  setPostsAction,
  setUnreadStateAction,
  deletePostAction,
  cleanPostsAction,
} from '../../actions/posts'
import { cleanDetailPostAction } from '../../actions/detailPost'

/** Import Api functions **/
import { apiGet } from '../../api'

/** Import URL **/
import { POSTS } from '../../api/urls'

/** Import IconMoon **/
import { IconMoon } from './../../components/icon/IconMoon'

/** Const to define size in icons **/
const ICON_TRASH_SIZE = 20

/**
 * Class to export posts view
 *
 * @class PostsScreen
 * @extends {Component}
 */
class PostsScreen extends Component {
  /**
   * Creates an instance of PostsScreen.
   * @param {*} props
   * @memberof PostsScreen
   */
  constructor(props) {
    super(props)
    this._setParamsNavigation()
    this.state = {}
    if (this.props.posts.data.length === 0) {
      this._getPosts()
    }
  }

  /**
   * Default options to navigation
   *
   * @static
   * @memberof PostsScreen
   */
  static navigationOptions = ({ navigation }) => {
    return navigation.state.params
      ? navigation.state.params
      : {
          title: Platform.OS === 'ios' ? StringsConstants.tabAll : StringsConstants.tabAll.toUpperCase(),
          swipeEnabled: false,
        }
  }

  /**
   * Set params to navigation
   *
   * @memberof PostsScreen
   */
  _setParamsNavigation = () => {
    this.props.navigation.setParams({
      tabBarOnPress: this._handleTabBarOnPress,
      title: StringsConstants.tabAll,
      swipeEnabled: false,
    })
  }

  /**
   * Function to get all posts
   *
   * @memberof PostsScreen
   */
  _getPosts = async () => {
    let data = await apiGet(POSTS)()
    this.props.setPostsAction(data)
  }

  /**
   * Function to clean all posts
   *
   * @memberof PostsScreen
   */
  _cleanPosts = () => {
    this.props.cleanPostsAction()
    this.refs.toast.show(StringsConstants.allpostsDeleted, DURATION.LENGTH_LONG)
  }

  /**
   * Handle onPress tab
   *
   * @memberof PostsScreen
   */
  _handleTabBarOnPress = () => {
    this.props.navigationAction(Routes.postsScreen, this.props.navigation)
  }

  /**
   * Return an id to each view
   *
   * @memberof PostsScreen
   */
  keyExtractor = item => {
    return `${item.id}`
  }

  /**
   * Render item
   *
   * @memberof PostsScreen
   */
  renderItem = ({ item, index }) => (
    <ItemPost item={item} index={index} toast={this.refs.toast} navigation={this.props.navigation} />
  )

  /**
   * Render emtpy component
   *
   * @memberof PostsScreen
   */
  renderEmpty = () => {
    return (this.props.posts.data && this.props.posts.data.length > 0) || this.props.posts.loading ? null : (
      <View style={styles.containerEmpty}>
        <Text style={styles.containerTextEmpty}>¡Vaya¡, no hay información para mostrarte.</Text>
      </View>
    )
  }

  /**
   * Render loader in footer
   *
   * @memberof PostsScreen
   */
  renderFooter = () => {
    if (this.props.posts.loading) return <LoaderWithoutModal />
  }

  /**
   * Render posts view
   *
   * @returns
   * @memberof PostsScreen
   */
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flexOne}
          data={this.props.posts.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderEmpty()}
          ListFooterComponent={this.renderFooter()}
        />
        <Toast ref={StringsConstants.toast} style={StringsConstants.alertToast} />
        {Platform.OS === 'ios' ? (
          <TouchableOpacity style={styles.buttonTrasIOS} onPress={this._cleanPosts}>
            <Text style={styles.buttonTextTrasIOS}>{StringsConstants.deleteAll}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonTrashAndroid} onPress={this._cleanPosts}>
            <IconMoon name={Icons.trash} size={ICON_TRASH_SIZE} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const mapDispatchToProps = {
  navigationAction,
  loadingPostsAction,
  setPostsAction,
  setUnreadStateAction,
  deletePostAction,
  cleanPostsAction,
  cleanDetailPostAction,
}

const mapStateToProps = state => ({
  posts: state.posts,
})

/** Export component PostsScreen **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsScreen)
