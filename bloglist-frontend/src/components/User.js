import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Header } from 'semantic-ui-react'

const User = (props) => {
  try {
    console.log('UserInfoPage', props.user)
    return (
      <div>
        <Header as='h1'>{props.user.name}</Header>
        <Table color='teal'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Added blogs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.user.blogs.map(blog => {
              return (
                <Table.Row key={blog.id}><Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></Table.Cell></Table.Row>
              )
            })
            }
          </Table.Body>
        </Table>
      </div>
    )
  } catch (error) {
    console.log('UserInfoPage error')
    return null
  }
}

const mapStateToProps = (state) => {
  console.log('BLOG STATE', state)
  return {
    notification: state.notification,
    loggedUser: state.loggedUser,
    blogs: state.blogs,
  }
}
export default connect(mapStateToProps, null)(User)