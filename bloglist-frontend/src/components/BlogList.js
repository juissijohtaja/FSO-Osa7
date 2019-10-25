import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const BlogList = (props) => {
  console.log('BlogList props', props)
  return (
    <Table color='teal'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.blogs.map(blog => {
          return (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </Table.Cell>
              <Table.Cell>
                {blog.author}
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

const blogsToShow = ({ blogs }) => {
  //const blogsNew = blogs.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  console.log('BlogList state', state)
  return {
    blogs: blogsToShow( state ),
    loggedUser: state.loggedUser
  }
}

export default connect( mapStateToProps, null )(BlogList)