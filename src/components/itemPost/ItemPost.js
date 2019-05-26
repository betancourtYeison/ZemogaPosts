/** Import modules **/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Alert, TouchableOpacity, Platform, Text } from 'react-native'
import Swipeout from 'react-native-swipeout'

/** Import Constants **/
import Icons from './../../constants/icons/icons'
import Colors from './../../constants/styles/colors'
import Routes from './../../constants/routes/routes'
import StringsConstants from './../../constants/strings/strings'
import styles from './style'

/** Import Components **/
import { DURATION } from './../toast/Toast'

/** Import actions **/
import { navigationAction } from './../../actions/navigation'
import { setUnreadStateAction, deletePostAction } from './../../actions/posts'
import { cleanDetailPostAction } from './../../actions/detailPost'

/** Import IconMoon **/
import { IconMoon } from './../../components/icon/IconMoon'

/** Const to define size in icons **/
const ICON_SIZE = 15

/**
 * Class to export component with item details
 *
 * @param {*} props
 * @returns
 */
export class ItemPost extends Component {
  /**
   *Creates an instance of LoginScreen.
   * @param {*} props
   * @memberof LoginScreen
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Render ItemPost in modal
   *
   * @returns
   * @memberof ItemPost
   */
  render() {
    return (
      <Swipeout
        autoClose={true}
        left={[
          {
            text: this.props.item.unread ? 'Read' : 'Unread',
            type: this.props.item.unread ? 'default' : 'primary',
            onPress: () => {
              if (this.props.item.unread) {
                this.props.item.unread = false
                this.props.setUnreadStateAction(this.props.item, false)
              } else {
                this.props.item.unread = true
                this.props.setUnreadStateAction(this.props.item, true)
              }
            },
          },
        ]}
        right={[
          {
            text: 'Delete',
            type: 'delete',
            onPress: () => {
              Alert.alert(
                StringsConstants.alert,
                StringsConstants.messageDelete,
                [
                  {
                    text: StringsConstants.cancel,
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: StringsConstants.yes,
                    onPress: () => {
                      this.props.deletePostAction(this.props.item)
                      this.props.toast.show(StringsConstants.postDeleted, DURATION.LENGTH_LONG)
                      if (this.props.reloadFavorites) {
                        setTimeout(() => {
                          this.props.reloadFavorites()
                        }, 100)
                      }
                    },
                  },
                ],
                { cancelable: false }
              )
            },
          },
        ]}
      >
        <TouchableOpacity
          style={styles.containerItem}
          onPress={() => {
            this.props.cleanDetailPostAction()
            this.props.navigationAction(Routes.detailPostScreen, this.props.navigation, { post: this.props.item })
            this.props.setUnreadStateAction(this.props.item, false)
            this.props.item.unread = false
          }}
        >
          {this.props.item.unread ? <View style={styles.containerIconBlue} /> : null}
          {this.props.item.favorite && Platform.OS === 'ios' ? (
            <View style={styles.containerIconIOS}>
              <IconMoon name={Icons.starFull} size={ICON_SIZE} color={Colors.star} />
            </View>
          ) : null}
          <Text style={styles.text}>{this.props.item.title}</Text>
          {this.props.item.favorite && Platform.OS !== 'ios' ? (
            <View style={styles.containerIconAndroid}>
              <IconMoon name={Icons.starFull} size={ICON_SIZE} color={Colors.star} />
            </View>
          ) : null}
          {this.props.item.favorite && Platform.OS === 'ios' ? (
            <View style={styles.containerIconAndroid}>
              <IconMoon name={Icons.arrowForwardIos} size={ICON_SIZE} color={Colors.veryLightPink} />
            </View>
          ) : null}
        </TouchableOpacity>
      </Swipeout>
    )
  }
}

const mapDispatchToProps = {
  navigationAction,
  setUnreadStateAction,
  deletePostAction,
  cleanDetailPostAction,
}

const mapStateToProps = state => ({
  posts: state.posts,
})

/** Export component ItemPost **/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPost)
