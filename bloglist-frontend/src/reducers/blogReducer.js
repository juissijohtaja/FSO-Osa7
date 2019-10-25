/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import commentService from '../services/comments'


const blogReducer = (state = [], action) => {
  console.log('blogReducer state now: ', state)
  console.log('action', action)
  const stateCopy = [...state]

  switch (action.type) {
  case 'INIT_BLOGS':
    console.log('blogReducer, INIT_BLOGS', action.data)
    return action.data
  case 'ADD_BLOG':
    console.log('blogReducer, ADD_BLOG')
    return [...state, action.data]
  case 'REMOVE_BLOG':
    console.log('blogReducer, REMOVE_BLOG', action.data)
    return state.filter(blog => blog.id !== action.data)
  case 'UPDATE_BLOG':
    return stateCopy.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'LIKE':
    console.log('blogReducer, LIKE', action.data)
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'ADD_COMMENT':
    console.log('blogReducer, ADD_COMMENT', action.data)
    const blogId = action.data.blog
    const blogToUpdate = stateCopy.find(blog => blog.id === blogId)
    blogToUpdate.comments.push({ text: action.data.text, id: action.data.id })
    return stateCopy.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  console.log('initializeBlogs:')
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blogObject => {
  console.log('blogAdd, blogObject:',blogObject)
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    console.log('blog to delete', id)
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    blog.likes += 1
    const updatedBlog = await blogService.update(blog)
    console.log('updatedBlog',updatedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const createComment = (comment, blogId) => {
  console.log('createComment, comment', comment)
  console.log('createComment, blogId', blogId)
  return async dispatch => {
    const newComment = await commentService.createComment(comment, blogId)
    console.log('createComment, newComment', newComment)
    dispatch({
      type: 'ADD_COMMENT',
      data: newComment
    })
  }
}

export default blogReducer