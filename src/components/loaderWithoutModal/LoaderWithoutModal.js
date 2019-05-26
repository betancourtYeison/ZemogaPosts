/** Import modules **/
import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

/** Import Constants **/
import Colors from './../../constants/styles/colors'
import StringsConstants from './../../constants/strings/strings'
import styles from './style'

/**
 * Class to export component with indicator loader
 *
 * @param {*} props
 * @returns
 */
export class LoaderWithoutModal extends Component {
  /**
   *Creates an instance of LoaderWithoutModal.
   * @param {*} props
   * @memberof LoaderWithoutModal
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Render loaderWithoutModal in modal
   *
   * @returns
   * @memberof LoaderWithoutModal
   */
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size={StringsConstants.large} color={Colors.greenBlue} />
      </View>
    )
  }
}

/** Export component LoaderWithoutModal **/
export default LoaderWithoutModal
