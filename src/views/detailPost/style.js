/** Styles to view **/
import { StyleSheet } from 'react-native'

/** Import Constants **/
import Colors from './../../constants/styles/colors'

/** Create an object style **/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 4,
    paddingBottom: 4,
  },
  containerDescription: {
    marginLeft: 14,
    marginRight: 14,
  },
  containerDescriptionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black,
  },
  containerDescriptionBody: {
    marginTop: 14,
    fontSize: 14,
    letterSpacing: 0,
    color: Colors.black,
  },
  containerUser: {
    marginTop: 14,
    marginLeft: 14,
    marginRight: 14,
  },
  containerUserTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 10,
  },
  containerUserBody: {
    marginTop: 4,
    fontSize: 14,
    letterSpacing: 0,
    color: Colors.black,
  },
  containerComments: {
    marginTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: Colors.veryLightPink,
    height: 30,
    justifyContent: 'center',
  },
  containerCommentsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black,
  },
  flexOne: {
    flex: 1,
  },
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
  text: {
    height: '100%',
    flex: 1,
    fontSize: 14,
    letterSpacing: 0,
    color: Colors.black,
    marginLeft: 14,
    marginRight: 14,
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
