const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')


commentsRouter.get('/:id/comments', async (request, response, next) => {
  //const blog = await Blog.findById(request.params.id)

  try{
    //const blog = await Blog.findById(request.params.id)
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).populate('comments', { text: 1 })
    if (blog) {
      response.json(blog.comments.map(comment =>
        comment.toJSON()
      ))
      //response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

commentsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    console.log('request body', body)
    console.log('blog.id', blog.id)

    if (body.text === undefined) {
      return response.status(400).json({ error: 'text should be defined' })
    } else if (body.text.length < 3) {
      return response.status(400).json({ error: 'text should be at least 3 characters long' })
    }

    const comment = new Comment({
      text: body.text,
      blog: blog.id,
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.json(savedComment)
  } catch (exception) {
    next(exception)
  }
})


module.exports = commentsRouter