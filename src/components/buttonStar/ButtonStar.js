/** Import modules **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, DeviceEventEmitter } from 'react-native'

/** Import constants **/
import Icons from './../../constants/icons/icons'
import Colors from './../../constants/styles/colors'

/** Import IconMoon **/
import { IconMoon } from './../icon/IconMoon'

/** Import actions **/
import { setFavoriteStateAction } from './../../actions/posts'

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
 * @class ButtonStar
 * @extends {Component}
 */
class ButtonStar extends Component {
  /**
   * Creates an instance of ButtonStar.
   * @param {*} props
   * @memberof ButtonStar
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Function to update state favorite
   *
   * @memberof ButtonStar
   */
  _updateFavorite = () => {
    this.props.setFavoriteStateAction(this.props.detailPost.post)
    setTimeout(() => {
      DeviceEventEmitter.emit('updateFavorites', {})
    }, 100)
  }

  /**
   * Render Button with star
   *
   * @returns
   * @memberof ButtonStar
   */
  render() {
    return (
      <TouchableOpacity style={STYLE_RELOAD} onPress={this._updateFavorite}>
        <IconMoon
          name={this.props.detailPost.post && this.props.detailPost.post.favorite ? Icons.starFull : Icons.starEmpty}
          size={ICON_SIZE}
          color={Colors.white}
        />
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = { setFavoriteStateAction }

const mapStateToProps = state => ({
  detailPost: state.detailPost,
})

/** Export component ButtonStar **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonStar)
