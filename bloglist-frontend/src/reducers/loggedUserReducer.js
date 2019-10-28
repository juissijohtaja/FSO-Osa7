import loginService from '../services/login'
import blogService from '../services/blogs'


const loggedUserReducer = (state = null, action) => {
  console.log('loggedUserReducer state: ', state)
  console.log('loggedUserReducer action', action)

  switch (action.type) {
  case 'SET_LOGGED_USER':
    console.log('loggedUserReducer, SET_LOGGED_USER', action.data)
    return action.data
  case 'REMOVE_LOGGED_USER':
    return null
  default:
    return state
  }
}

export const setLoggedUser = (loggedUser) => {
  console.log('loggedUserReducer, setUser', loggedUser)
  return async dispatch => {
    dispatch({
      type: 'SET_LOGGED_USER',
      data: loggedUser
    })
  }
}

export const loginSet = (username, password) => {
  console.log('loggedUserReducer, loginSet username', username)
  console.log('loggedUserReducer, loginSet password', password)

  return async dispatch => {

    const user = await loginService.login({
      username,
      password
    })
    console.log('loggedUserReducer, loginSet user', user)

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(setLoggedUser(user))
  }
}

export const removeLoggedUser = () => {
  console.log('loggedUserReducer, removeLoggedUser')
  return async dispatch => {
    dispatch({
      type: 'REMOVE_LOGGED_USER',
    })
  }
}

export default loggedUserReducer