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
