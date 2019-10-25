import userService from '../services/users'

const userReducer = (state = [], action) => {
  console.log('userReducer state: ', state)
  console.log('userReducer action', action)

  switch (action.type) {
  case 'INIT_USERS':
    console.log('userReducer, INIT_USERS', action.data)
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  console.log('initializeUsers')
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer