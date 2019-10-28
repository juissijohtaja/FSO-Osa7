import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { inputUsername, inputPassword, inputReset } from '../reducers/loginReducer'
import { loginSet, setLoggedUser, removeLoggedUser } from '../reducers/loggedUserReducer'
import { notificationSet } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  console.log('LoginForm props', props)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginSet(props.login.username, props.login.password)
      props.notificationSet('Login successful.', 3)
      console.log('login successful')
      props.inputReset()
    } catch (exception) {
      props.notificationSet('Wrong credentials.', 3)
    }
  }

  return (
    <div className='loginForm'>
      <p>Enter username and password</p>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input id='username' name='username' value={props.login.username} onChange={(event) => { props.inputUsername(event.target.value) } } />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id='password' type='password' value={props.login.password} onChange={(event) => { props.inputPassword(event.target.value) } } />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.shape({
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }),
  password: PropTypes.shape({
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired
  })
}



const mapStateToProps = (state) => {
  console.log('LoginForm state', state)
  return {
    login: state.login,
  }
}
export default connect(mapStateToProps, { inputUsername, inputPassword, inputReset, loginSet, setLoggedUser, removeLoggedUser, notificationSet })(LoginForm)