import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleLogin, username, password }) => {

  username = { ...username, reset: null }
  password = { ...password, reset: null }

  return (
    <div className='loginForm'>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input name='username' {...username} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input type='password' {...password} />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
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

export default LoginForm