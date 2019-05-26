/** Styles to Button **/
import { StyleSheet } from 'react-native'

/** Import Constants **/
import Colors from './../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    justifyContent: 'center',
    height: 'auto',
    paddingTop: 4,
    paddingBottom: 4,
  },
  text: {
    color: Colors.white,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconStyle: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    width: '70%',
  },
  containerText: {
    marginLeft: 14,
    marginRight: 14,
  },
  alertToastContainer: {
    backgroundColor: Colors.redBGToast,
    width: '50%',
    borderRadius: 20,
  },
  alertToastText: {
    color: Colors.white,
    fontSize: 16,
  },
  infoToastContainer: {
    backgroundColor: Colors.greenBlue,
    width: '100%',
  },
  infoToastText: {
    color: Colors.white,
    fontSize: 16,
  },
})

/** Export component styles **/
export default styles
