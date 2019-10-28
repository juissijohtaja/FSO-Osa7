const commentFormReducer = (state = { text:'' }, action) => {
  switch (action.type) {
  case 'INPUT_COMMENT':
    console.log('blogFormReducer INPUT_USERNAME', action.data)
    return { ...state, text: action.data }
  case 'RESET_COMMENT':
    return { text: '' }
  default: // jos ei mikään ylläolevista tullaan tänne
    return state
  }
}

export const inputCommentForm = (text) => {
  console.log('commentFormReducer inputComment', text)
  return async dispatch => {
    dispatch({
      type: 'INPUT_COMMENT',
      data: text
    })
  }
}

export const resetCommentForm = () => {
  console.log('commentFormReducer inputResetCommentForm')
  return async dispatch => {
    dispatch({
      type: 'RESET_COMMENT'
    })
  }
}

export default commentFormReducer