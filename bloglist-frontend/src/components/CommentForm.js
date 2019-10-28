import React from 'react'
import { connect } from 'react-redux'
import { notificationSet } from '../reducers/notificationReducer'
import { createComment } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'
import { inputCommentForm, resetCommentForm } from '../reducers/commentFormReducer'


const CommentForm = (props) => {

  const addCommentObject = async (event) => {
    event.preventDefault()
    const commentObject = props.commentForm
    const blogId = props.blog.id
    console.log('addCommentObject, newCommentObject', commentObject)
    try {
      props.createComment(commentObject, blogId)
      props.resetCommentForm()
      props.notificationSet(`New comment added: ${commentObject.text}`, 3)
    } catch (exception) {
      props.notificationSet('Comment not created. Check input fields.', 3)
    }
  }

  return (
    <div className='commentForm'>
      <Form onSubmit={addCommentObject}>
        <div>
          <input
            id='comment'
            name="text"
            onChange={(event) => { props.inputCommentForm(event.target.value) } }
            value={props.commentForm.text}
          /> <Button secondary type="submit">Add comment</Button>
        </div>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('BLOG STATE', state)
  return {
    notification: state.notification,
    loggedUser: state.loggedUser,
    blogs: state.blogs,
    commentForm: state.commentForm
  }
}
export default connect(mapStateToProps, { notificationSet, createComment, inputCommentForm, resetCommentForm })(CommentForm)