import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UserList = (props) => {
  console.log('UserList props', props)
  return (
    <Table color='teal'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Blogs created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.users.map(user => {
          return (
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )})}
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = (state) => {
  console.log('UserList state', state)
  return {
    users: state.users,
    loggedUser: state.loggedUser
  }
}

export default connect( mapStateToProps, null )(UserList)