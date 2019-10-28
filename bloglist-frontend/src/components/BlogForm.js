import React from 'react'
import { Form, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { inputTitle, inputAuthor, inputUrl, inputResetBLogForm } from '../reducers/blogFormReducer'
import { notificationSet } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {

  const addBlogObject = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: props.blogForm.title,
      author: props.blogForm.author,
      url: props.blogForm.url,
    }
    console.log('blogObject', blogObject)
    try {
      if (props.loggedUser) {
        props.createBlog(blogObject)
        props.inputResetBLogForm()
        props.notificationSet(`New blog added: ${blogObject.title} by ${blogObject.author}`, 3)
      } else {
        props.notificationSet('Please login', 3)
      }
    } catch (exception) {
      props.notificationSet('Blog not created. Check input fields.', 3)
    }
  }

  return (
    <div>
      <Form onSubmit={addBlogObject}>
        <Form.Field>
          <label>title:</label>
          <input id='title' name='title' value={props.blogForm.title} onChange={(event) => { props.inputTitle(event.target.value) } } /></Form.Field>
        <Form.Field>
          <label>author:</label>
          <input id='author' name='author' value={props.blogForm.author} onChange={(event) => { props.inputAuthor(event.target.value) } } /></Form.Field>
        <Form.Field>
          <label>url:</label>
          <input id='url' name='url' value={props.blogForm.url} onChange={(event) => { props.inputUrl(event.target.value) } } /></Form.Field>
        <Button primary type='submit'>Save</Button>
      </Form>
    </div>
  )
}

//export default BlogForm

const mapStateToProps = (state) => {
  console.log('BlogForm state', state)
  return {
    blogForm: state.blogForm,
    loggedUser: state.loggedUser
  }
}

export default connect(mapStateToProps, { inputTitle, inputAuthor, inputUrl, inputResetBLogForm, notificationSet, createBlog })(BlogForm)