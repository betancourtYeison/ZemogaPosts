import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import reducers from './../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(promiseMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
