/** Import modules **/
import React, { Component } from 'react'
import { View, Animated, Text, ViewPropTypes as RNViewPropTypes, Platform } from 'react-native'
import PropTypes from 'prop-types'

/** Import Constants **/
import Colors from './../../constants/styles/colors'
import Icons from '../../constants/icons/icons'

/** Components **/
import styles from './style'

/** Import IconMoon **/
import { IconMoon } from '../../components/icon/IconMoon'

/** Variables **/
const ViewPropTypes = RNViewPropTypes || View.propTypes
const ICON_SIZE = 25

/** Export const duration **/
export const DURATION = {
  LENGTH_SHORT: 500,
  LENGTH_LONG: 1000,
  FOREVER: 0,
}

/**
 * Export component Toast
 *
 * @export
 * @class Toast
 * @extends {Component}
 */
export default class Toast extends Component {
  /**
   *Creates an instance of Toast.
   * @param {*} props
   * @memberof Toast
   */
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(this.props.opacity),
    }
  }

  /**
   * function to show toast
   *
   * @param {*} text
   * @param {*} duration
   * @param {*} callback
   * @memberof Toast
   */
  show(text, duration, callback) {
    this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT
    this.callback = callback
    this.setState({
      isShow: true,
      text: text,
    })
    this.animation = Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity,
      duration: this.props.fadeInDuration,
    })
    this.animation.start(() => {
      this.isShow = true
      if (duration !== DURATION.FOREVER) this.close()
    })
  }

  /**
   * function to close toast
   *
   * @param {*} duration
   * @memberof Toast
   */
  close(duration) {
    let delay = typeof duration === 'undefined' ? this.duration : duration

    if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250

    if (!this.isShow && !this.state.isShow) return
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.animation = Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        duration: this.props.fadeOutDuration,
      })
      this.animation.start(() => {
        this.setState({
          isShow: false,
        })
        this.isShow = false
        if (typeof this.callback === 'function') {
          this.callback()
        }
      })
    }, delay)
  }

  /**
   * Function to unmount component
   *
   * @memberof Toast
   */
  componentWillUnmount() {
    this.animation && this.animation.stop()
    this.timer && clearTimeout(this.timer)
  }

  /**
   * Render component toast
   *
   * @returns
   * @memberof Toast
   */
  render() {
    let pos
    switch (this.props.position) {
      case 'top':
        pos = { top: 0 }
        break
      case 'center':
        pos = { bottom: Platform.OS === 'ios' ? 70 : 14 }
        break
      case 'bottom':
        pos = { bottom: 0 }
        break
      default:
        pos = { bottom: 0 }
        break
    }

    return this.state.isShow ? (
      <View style={[styles.container, pos]} pointerEvents="none">
        <Animated.View
          style={[styles.content, { opacity: this.state.opacityValue }, styles[`${this.props.style}Container`]]}
        >
          {this.props.showIcon ? (
            <View style={styles.iconContainer}>
              <View style={styles.iconStyle}>
                <IconMoon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
              </View>
              <View style={styles.iconText}>
                <Text style={styles[`${this.props.style}Text`]}>{this.state.text}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.containerText}>
              <Text style={styles[`${this.props.style}Text`]}>{this.state.text}</Text>
            </View>
          )}
        </Animated.View>
      </View>
    ) : null
  }
}

Toast.propTypes = {
  style: PropTypes.string,
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  positionValue: PropTypes.number,
  fadeInDuration: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
}

Toast.defaultProps = {
  position: 'center',
  positionValue: 120,
  fadeInDuration: 750,
  fadeOutDuration: 1000,
  opacity: 0.8,
  showIcon: true,
  iconName: Icons.toast,
  iconSize: ICON_SIZE,
  iconColor: Colors.redIconToast,
}
