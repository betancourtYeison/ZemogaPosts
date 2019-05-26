/** Styles to view **/
import { StyleSheet } from 'react-native'

/** Import Constants **/
import Colors from './../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.veryLightPink,
    backgroundColor: Colors.white,
    paddingTop: 4,
    paddingBottom: 4,
  },
  containerIconBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    backgroundColor: Colors.cobalt,
    height: 14,
    width: 14,
    borderRadius: 50,
  },
  containerIconIOS: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },
  containerIconAndroid: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  text: {
    height: '100%',
    flex: 1,
    fontSize: 14,
    letterSpacing: 0,
    color: Colors.black,
    marginLeft: 14,
    marginRight: 14,
  },
})

/** Export component styles **/
export default styles
