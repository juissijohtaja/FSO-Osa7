const counterReducer = (state = 0, action) => {
  //console.log('KAKKA STATE',state)
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  case 'ZERO':
    return 0
  default: // jos ei mikään ylläolevista tullaan tänne
    return state
  }
}

export const counterPlus = () => {
  console.log('plus')
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
    })
  }
}

export const counterMinus = () => {
  console.log('minus')
  return async dispatch => {
    dispatch({
      type: 'DECREMENT',
    })
  }
}

export const counterZero = () => {
  console.log('zero')
  return async dispatch => {
    dispatch({
      type: 'ZERO',
    })
  }
}

export default counterReducer