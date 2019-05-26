/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

/** Import configStore **/
import configStore from './src/store'

/** Import navigator **/
import { AppNavigator } from './src/navigators/AppNavigator'

const { store, persistor } = configStore()

/**
 * Create and export main app
 *
 * @export
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * Render main app
   *
   * @returns
   * @memberof App
   */
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

/** Register App **/
AppRegistry.registerComponent('ZemogaPosts', () => App)

/** Export App **/
export default App
