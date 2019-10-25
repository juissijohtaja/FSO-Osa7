import React from 'react'
import { Form, Button } from 'semantic-ui-react'

//import { connect } from 'react-redux'
//import { blogReducer } from '../reducers/blogReducer'
//import { blogSet } from '../reducers/blogReducer'



const BlogForm = ({ addBlogObject, handleBlogObjectChange, newBlogObject }) => {
  const title = newBlogObject.title
  const author = newBlogObject.author
  const url = newBlogObject.url
  return (
    <div>
      <Form onSubmit={addBlogObject}>
        <Form.Field>
          <label>title:</label>
          <input name="title" value={title} onChange={handleBlogObjectChange} /></Form.Field>
        <Form.Field>
          <label>author:</label>
          <input name="author" value={author} onChange={handleBlogObjectChange} /></Form.Field>
        <Form.Field>
          <label>url:</label>
          <input name="url" value={url} onChange={handleBlogObjectChange} /></Form.Field>
        <Button primary type="submit">Save</Button>
      </Form>
    </div>
  )
}

export default BlogForm

/* const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    blog: state.blog,
  }
}
export default connect(mapStateToProps, { blogSet })(BlogForm) */