/** Styles to view **/
import { StyleSheet } from 'react-native'

/** Import Constants **/
import Colors from './../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flexOne: {
    flex: 1,
  },
  buttonTrasIOS: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.redTrash,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTrasIOS: {
    fontSize: 14,
    letterSpacing: 0,
    color: Colors.black,
  },
  buttonTrashAndroid: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.redTrash,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 14,
  },
  containerEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextEmpty: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.black,
    margin: 14,
  },
})

/** Export component styles **/
export default styles
