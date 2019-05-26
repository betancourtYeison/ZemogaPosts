/** Import modules **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'

/** Import constants **/
import Icons from './../../constants/icons/icons'
import Colors from './../../constants/styles/colors'

/** Import IconMoon **/
import { IconMoon } from './../icon/IconMoon'

/** Import actions **/
import { loadingPostsAction, setPostsAction, cleanPostsAction } from './../../actions/posts'

/** Import Api functions **/
import { apiGet } from './../../api'

/** Import URL **/
import { POSTS } from './../../api/urls'

/** Const to define size in icons **/
const ICON_SIZE = 20

/** Const to define style reload button **/
const STYLE_RELOAD = {
  padding: 8,
  marginRight: 6,
}

/**
 * Class to export component with button
 *
 * @class ButtonReload
 * @extends {Component}
 */
class ButtonReload extends Component {
  /**
   * Creates an instance of ButtonReload.
   * @param {*} props
   * @memberof ButtonReload
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Function to get all posts again
   *
   * @memberof ButtonReload
   */
  _getPosts = async () => {
    this.props.cleanPostsAction()
    this.props.loadingPostsAction(true)
    let data = await apiGet(POSTS)()
    this.props.setPostsAction(data)
  }

  /**
   * Render Button with reload
   *
   * @returns
   * @memberof ButtonReload
   */
  render() {
    return (
      <TouchableOpacity style={STYLE_RELOAD} onPress={this._getPosts}>
        <IconMoon name={Icons.reload} size={ICON_SIZE} color={Colors.white} />
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = { loadingPostsAction, setPostsAction, cleanPostsAction }

const mapStateToProps = state => ({})

/** Export component ButtonReload **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonReload)
