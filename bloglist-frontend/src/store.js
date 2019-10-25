import { createStore, combineReducers, applyMiddleware } from 'redux'
import counterReducer from './reducers/counterReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import userReducer from './reducers/userReducer'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  counter: counterReducer,
  blogs: blogReducer,
  notification: notificationReducer,
  loggedUser: loggedUserReducer,
  users: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store