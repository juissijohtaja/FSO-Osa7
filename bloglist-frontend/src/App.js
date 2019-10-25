/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter, HashRouter
} from 'react-router-dom'

// Components
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'

// Services & Reducers
import blogService from './services/blogs'
import { counterPlus, counterMinus, counterZero } from './reducers/counterReducer'
import { notificationSet } from './reducers/notificationReducer'
import { createBlog } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginSet, setLoggedUser, removeLoggedUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/userReducer'

// Custom Hooks
import  { useField } from './hooks'

// Styles
import './index.css'
import { Container, Header, Menu, Button, Segment } from 'semantic-ui-react'

const App = (props) => {
  console.log('App props', props)

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      props.setLoggedUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [newBlogObject, setNewBlogObject] = useState(
    {
      title: '',
      author: '',
      url: '',
    }
  )

  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

  const addBlogObject = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newBlogObject.title,
      author: newBlogObject.author,
      url: newBlogObject.url,
    }
    console.log('blogObject', blogObject)
    try {
      props.createBlog(blogObject)
      setNewBlogObject({
        title: '',
        author: '',
        url: '',
      })

      props.notificationSet(`New blog added: ${newBlogObject.title} by ${newBlogObject.author}`, 3)
    } catch (exception) {
      props.notificationSet('Blog not created. Check input fields.', 3)
    }
  }

  const handleBlogObjectChange = (event) => {
    //console.log({ [event.target.name]: event.target.value })
    setNewBlogObject({ ...newBlogObject, [event.target.name]: event.target.value })
    //console.log('newBlogObject', newBlogObject)
  }

  const Footer = () => {

    return (
      <Segment inverted color='grey'>
        <Header as='h5'>Blog app, Department of Computer Science 2019</Header>
      </Segment>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('logging in...')
      props.loginSet(username, password)

      /* const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user) */

      username.reset()
      password.reset()


      props.notificationSet('Login successful.', 3)
      console.log('login successful')
    } catch (exception) {
      props.notificationSet('Wrong credentials.', 3)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log('logging out...')
      //setUser(null)
      props.removeLoggedUser()
      props.notificationSet('Logout successful.', 3)
      console.log('logout successful')
    } catch (exception) {
      props.notificationSet('Logout error.', 3)
    }
  }

  const blogObjectForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
          <BlogForm
            newBlogObject={newBlogObject}
            handleBlogObjectChange={handleBlogObjectChange}
            addBlogObject={addBlogObject}
          />
        </Togglable>
      </div>
    )
  }

  const HomePage = () => {
    return (
      <div>
        <Header as='h1'>Latest blogs</Header>
        <BlogList />
        <Header as='h2'>Create new blog</Header>
        {blogObjectForm()}
        <Header as='h2'>Counter test</Header>
        <button onClick={() => { props.counterPlus() } }>plus</button>
        <button onClick={e => { props.counterMinus() }}>minus</button>
        <button onClick={e => { props.counterZero() }}>zero</button>
        <p>Counter: { props.counter }</p>
      </div>
    )}

  /* const BlogsPage = () => {
    return (
      <div>
        <h1 className='latestBlogs'>Latest blogs</h1>
        <BlogList />
      </div>
    )} */

  const UsersListPage = () => {
    return (
      <div>
        <h1>Users</h1>
        <UserList />
      </div>
    )}

  const userById = (id) => {
    console.log('userById props.users', props.users)
    return (
      props.users.find(user => user.id === id)
    )
  }

  const blogById = (id) => {
    console.log('blogById props', props)
    return (
      props.blogs.find(blog => blog.id === id)
    )
  }

  const Login = () => {
    return (
      <div>
        <Header as='h1'>Login</Header>
        {props.loggedUser ? (
          <div>
            <h3>Current user: {props.loggedUser.name}</h3>
            <h3>Username: {props.loggedUser.username}</h3>
          </div>
        ) :
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password} />
        }
      </div>
    )}

  const padding = { padding: 5 }

  return (
    <Container>
      <Notification/>
      <HashRouter>
        <div>
          <Menu>
            <Menu.Item link>
              <Link style={padding} to="/">Home</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link style={padding} to="/users">Users</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item link>
                {props.loggedUser
                  ? <span><em>{props.loggedUser.name} logged in</em> <Button color='teal' onClick={() => handleLogout()}>Logout</Button></span>
                  : <Link to="/login"><Button primary>Login</Button></Link>
                }
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Route exact path="/" render={() =>
            <HomePage />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
          <Route exact path="/users" render={() =>
            props.loggedUser ? <UsersListPage /> : <Redirect to="/login" />
          } />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
          <Route path="/login" render={() =>
            <Login />
          } />
        </div>
      </HashRouter>
      <Footer />
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.loggedUser,
    users: state.users,
    counter: state.counter
  }
}

export default connect(mapStateToProps, { initializeBlogs, counterPlus, counterMinus, counterZero, notificationSet, createBlog, loginSet, setLoggedUser, removeLoggedUser, initializeUsers })(App)