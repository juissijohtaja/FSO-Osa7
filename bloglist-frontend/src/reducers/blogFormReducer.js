const blogFormReducer = (state = { title:'', author:'', url:'' }, action) => {
  switch (action.type) {
  case 'INPUT_TITLE':
    console.log('blogFormReducer INPUT_USERNAME', action.data)
    return { ...state, title: action.data }
  case 'INPUT_AUTHOR':
    console.log('blogFormReducer INPUT_PASSWORD', action.data)
    return { ...state, author: action.data }
  case 'INPUT_URL':
    console.log('blogFormReducer INPUT_PASSWORD', action.data)
    return { ...state, url: action.data }
  case 'INPUT_RESETBLOGFORM':
    return { title: '', author: '', url: '' }
  default: // jos ei mikään ylläolevista tullaan tänne
    return state
  }
}

export const inputTitle = (title) => {
  console.log('blogFormReducer inputTitle', title)
  return async dispatch => {
    dispatch({
      type: 'INPUT_TITLE',
      data: title
    })
  }
}

export const inputAuthor = (author) => {
  console.log('blogFormReducer inputAuthor', author)
  return async dispatch => {
    dispatch({
      type: 'INPUT_AUTHOR',
      data: author
    })
  }
}

export const inputUrl = (url) => {
  console.log('blogFormReducer inputUrl', url)
  return async dispatch => {
    dispatch({
      type: 'INPUT_URL',
      data: url
    })
  }
}

export const inputResetBLogForm = () => {
  console.log('blogFormReducer inputResetBLogForm')
  return async dispatch => {
    dispatch({
      type: 'INPUT_RESETBLOGFORM'
    })
  }
}

export default blogFormReducer