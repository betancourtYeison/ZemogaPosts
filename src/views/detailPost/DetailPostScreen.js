/** Import modules **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text } from 'react-native'

/** Import Constants **/
import StringsDetailPostScreen from './strings'
import styles from './style'

/** Import Loader **/
import LoaderWithoutModal from './../../components/loaderWithoutModal/LoaderWithoutModal'

/** Import actions **/
import { navigationAction } from './../../actions/navigation'
import { setDetailPostAction } from './../../actions/detailPost'

/** Import Api functions **/
import { apiGet } from './../../api'

/** Import URL **/
import { POSTS, USER } from './../../api/urls'

/**
 * Class to export detail post view
 *
 * @class DetailPostScreen
 * @extends {Component}
 */
class DetailPostScreen extends Component {
  /**
   * Creates an instance of DetailPostScreen.
   * @param {*} props
   * @memberof DetailPostScreen
   */
  constructor(props) {
    super(props)
    const post = this.props.navigation.getParam('post')
    this.state = {
      loading: true,
      post: post,
    }
  }

  /**
   * Function to load detail posts
   *
   * @memberof DetailPostScreen
   */
  componentDidMount() {
    this._getDetailPost()
  }

  /**
   * Default options to navigation
   *
   * @static
   * @memberof DetailPostScreen
   */
  static navigationOptions = ({ navigation }) => {
    return navigation.state.params ? navigation.state.params : {}
  }

  /**
   * Function to get detail of post
   *
   * @memberof DetailPostScreen
   */
  _getDetailPost = async () => {
    let post = this.state.post
    let user = await apiGet(`${USER}/${post.userId}`)()
    let comments = await apiGet(`${POSTS}/${post.id}/comments`)()
    comments = comments.filter(item => item.postId === post.id)
    this.props.setDetailPostAction({
      post,
      user,
      comments,
    })
    this.setState({ loading: false })
  }

  /**
   * Render loader
   *
   * @memberof DetailPostScreen
   */
  renderLoader = () => {
    if (this.state.loading) return <LoaderWithoutModal />
  }

  /**
   * Return an id to each view
   *
   * @memberof DetailPostScreen
   */
  keyExtractor = item => {
    return `${item.id}`
  }

  /**
   * Render item
   *
   * @memberof DetailPostScreen
   */
  renderItem = ({ item, index }) => (
    <View style={styles.containerItem}>
      <Text style={styles.text}>{item.body}</Text>
    </View>
  )

  /**
   * Render emtpy component
   *
   * @memberof DetailPostScreen
   */
  renderEmpty = () => {
    return this.props.detailPost.comments && this.props.detailPost.comments.length > 0 ? null : (
      <View style={styles.containerEmpty}>
        <Text style={styles.containerTextEmpty}>¡Vaya¡, no hay información para mostrarte.</Text>
      </View>
    )
  }

  /**
   * Render detail post view
   *
   * @returns
   * @memberof DetailPostScreen
   */
  render() {
    return (
      <View style={styles.container}>
        {this.renderLoader()}
        {!this.state.loading ? (
          <View>
            <View style={styles.containerDescription}>
              <Text style={styles.containerDescriptionTitle}>{StringsDetailPostScreen.textDescription}</Text>
              <Text style={styles.containerDescriptionBody}>{this.props.detailPost.post.body}</Text>
            </View>
            <View style={styles.containerUser}>
              <Text style={styles.containerUserTitle}>{StringsDetailPostScreen.textUser}</Text>
              <Text style={styles.containerUserBody}>
                {StringsDetailPostScreen.name}
                {this.props.detailPost.user.name}
              </Text>
              <Text style={styles.containerUserBody}>
                {StringsDetailPostScreen.email}
                {this.props.detailPost.user.email}
              </Text>
              <Text style={styles.containerUserBody}>
                {StringsDetailPostScreen.phone}
                {this.props.detailPost.user.phone}
              </Text>
              <Text style={styles.containerUserBody}>
                {StringsDetailPostScreen.website}
                {this.props.detailPost.user.website}
              </Text>
            </View>
            <View style={styles.containerComments}>
              <Text style={styles.containerCommentsTitle}>{StringsDetailPostScreen.textComments}</Text>
            </View>
          </View>
        ) : null}
        {!this.state.loading ? (
          <FlatList
            style={styles.flexOne}
            data={this.props.detailPost.comments}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ListHeaderComponent={this.renderEmpty()}
          />
        ) : null}
      </View>
    )
  }
}

const mapDispatchToProps = { navigationAction, setDetailPostAction }

const mapStateToProps = state => ({
  detailPost: state.detailPost,
})

/** Export component DetailPostScreen **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPostScreen)
