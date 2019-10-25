import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'



const Notification = (props) => {
  //console.log('Notification: message', props.notification)
  //console.log('Notification: style', props.notification.style)
  console.log('Notification:', props.notification)
  if (props.notification === null) {
    return null
  }

  return (
    <Message>
      {props.notification}
    </Message>
  )
}
const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    notification: state.notification,
  }
}
export default connect(mapStateToProps, null)(Notification)