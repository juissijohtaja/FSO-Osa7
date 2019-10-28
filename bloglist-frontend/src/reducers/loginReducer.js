const loginReducer = (state = { username:'', password:'' }, action) => {
  switch (action.type) {
  case 'INPUT_USERNAME':
    console.log('loginReducer INPUT_USERNAME', action.data)
    return { ...state, username: action.data }
  case 'INPUT_PASSWORD':
    console.log('loginReducer INPUT_PASSWORD', action.data)
    return { ...state, password: action.data }
  case 'INPUT_RESET':
    return { username: '', password: '' }
  default: // jos ei mikään ylläolevista tullaan tänne
    return state
  }
}

export const inputUsername = (username) => {
  console.log('loginReducer inputUsername', username)
  return async dispatch => {
    dispatch({
      type: 'INPUT_USERNAME',
      data: username
    })
  }
}

export const inputPassword = (password) => {
  console.log('loginReducer inputPassword', password)
  return async dispatch => {
    dispatch({
      type: 'INPUT_PASSWORD',
      data: password
    })
  }
}

export const inputReset = () => {
  console.log('inputReset')
  return async dispatch => {
    dispatch({
      type: 'INPUT_RESET'
    })
  }
}

export default loginReducer