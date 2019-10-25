import React, { useState } from 'react'
import { connect } from 'react-redux'
import { notificationSet } from '../reducers/notificationReducer'
import { deleteBlog, initializeBlogs, addLike, createComment } from '../reducers/blogReducer'
import { Comment, Form, Button, Icon, Label, Header, Segment } from 'semantic-ui-react'



//const Blog = React.forwardRef((props, ref) => {
const Blog = (props) => {
  if ( props.blog === undefined) {
    return null
  }
  const [commentObject, setCommentObject] = useState({
    text: ''
  })
  console.log('Blog props', props)

  const onClickTest = props.onClickTest
  // eslint-disable-next-line no-unused-vars



  const userName = () => {
    if (props.blog.user) {
      console.log('props.blog.user.name', props.blog.user.name)
      return (props.blog.user.name)
    } else {
      return 'unknown'
    }
  }

  const removeBlog = async (id) => {
    console.log('REMOVE id', id)
    if (window.confirm('Do you really want to remove this post?')) {
      try {
        props.deleteBlog(id)
        console.log('REMOVE DONE')
        props.initializeBlogs()
        props.notificationSet('Blog removed!', 3)
      } catch (exception) {
        props.notificationSet('Blog not removed.', 3)
      }
    }
  }

  const handleLike = async (event) => {
    event.preventDefault()
    console.log('I Like!')
    const blog = props.blog
    try {
      props.addLike(blog)
      props.notificationSet('New like added!', 3)
    } catch (exception) {
      props.notificationSet('Like not added.', 3)
    }
  }

  const RemoveButton = () => {
    //console.log('showRemoveButton', props.showRemoveButton)
    console.log('remove props', props.blog.user.username === props.loggedUser.username)
    const showRemove = () => {
      return props.blog.user.username === props.loggedUser.username
    }
    if (showRemove()) {
      return <p><Button onClick={handleRemove}>Remove post</Button></p>
    } else {
      return <div></div>
    }
  }

  const Comments = () => {
    console.log('blog comments', props.blog.comments)
    return (
      <Segment color='teal'>
        <Header as='h3' dividing>
            Comments
        </Header>
        <Comment.Group>
          {props.blog.comments.map(comment => {
            return (
              <Comment key={comment.id}>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment>
            )
          })}
        </Comment.Group>
      </Segment>
    )
  }

  const addCommentObject = async (event) => {
    event.preventDefault()
    const blogId = props.blog.id
    console.log('addCommentObject, newCommentObject', commentObject)
    try {
      props.createComment(commentObject, blogId)
      setCommentObject({
        text: '',
      })

      props.notificationSet(`New comment added: ${commentObject.text}`, 3)
    } catch (exception) {
      props.notificationSet('Comment not created. Check input fields.', 3)
    }
  }

  const handleCommentObjectChange = (event) => {
    console.log('CommentForm event', event)
    setCommentObject({ ...commentObject, [event.target.name]: event.target.value })
  }

  const CommentForm = ({ addCommentObject }) => {
    console.log('CommentForm commentText', commentObject)
    return (
      <div className='commentForm'>
        <Form onSubmit={addCommentObject}>
          <div>
            <input
              name="text"
              value={commentObject.text}
              onChange={handleCommentObjectChange}
            /> <Button secondary type="submit">Add comment</Button>
          </div>
        </Form>
      </div>
    )
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    const blog = props.blog
    console.log('props.blog.user.id', props.blog.user.id)
    console.log('Remove this!')
    console.log('event.target', event.target)
    removeBlog(blog.id)
  }

  return (
    <div>
      <div>
        <div>
          <h3>
            {props.blog.title}
          </h3>
          <p>
            {props.blog.author}
          </p>
          <p>
            Website: <a href={props.blog.url} target="_blank" rel="noopener noreferrer">{props.blog.url}</a> <br/>Added by: {userName()}
          </p>
          <Button as='div' labelPosition='right'>
            <Button color='red' onClick={onClickTest? onClickTest : handleLike}>
              <Icon name='heart' />
              Like
            </Button>
            <Label as='a' basic color='red' pointing='left'>
              {props.blog.likes}
            </Label>
          </Button>
          <RemoveButton />
          <Comments />
          <CommentForm addCommentObject={addCommentObject} handleCommentObjectChange={handleCommentObjectChange} commentObject={commentObject}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('BLOG STATE', state)
  return {
    notification: state.notification,
    loggedUser: state.loggedUser,
    blogs: state.blogs,
  }
}
export default connect(mapStateToProps, { notificationSet, deleteBlog, initializeBlogs, addLike, createComment })(Blog)