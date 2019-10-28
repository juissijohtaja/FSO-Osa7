/* eslint-disable no-undef */
describe('Blog App', function() {

  describe('Homepage: not logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Juissi Johtaja',
        username: 'juissi',
        password: 'johtaja'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000/#/')
    })
    it('front page can be opened', function() {
      cy.contains('Latest blogs')
    })
    it('notes page contains random text', function() {
      cy.contains('Science')
    })
    it('cannot post blog if not logged in', function() {
      cy.wait(500)
      cy.contains('Create new blog')
        .click()
      cy.get('#title')
        .type('this is not a drill')
      cy.get('#author')
        .type('kumi keijo')
      cy.get('#url')
        .type('www.kumikeijo.fi')
      cy.contains('Save')
        .click()
      cy.contains('Please login')
    })
  })

  describe('Login: not logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/#/login')
    })
    it('login page can be opened', function() {
      cy.contains('Enter username and password')
    })
    it('login works', function() {
      cy.wait(500)
      cy.get('#username')
        .type('juissi')
      cy.get('#password')
        .type('johtaja')
      cy.contains('login')
        .click()
      cy.contains('Juissi Johtaja logged in')
    })
    it('logout works', function() {
      cy.wait(500)
      cy.get('#username')
        .type('juissi')
      cy.get('#password')
        .type('johtaja')
      cy.contains('login')
        .click()
      cy.wait(500)
      cy.contains('Logout')
        .click()
      cy.contains('Login')
    })
  })

  describe('Users: page is shown for logged user', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/#/login')
    })
    it('page is shown after login', function() {
      cy.wait(500)
      cy.get('#username')
        .type('juissi')
      cy.get('#password')
        .type('johtaja')
      cy.contains('login')
        .click()
      cy.wait(500)
      cy.visit('http://localhost:3000/#/users')
      cy.contains('Blogs created')
    })
  })

  describe('Blog: new blog post can be added', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/#/login')
      cy.wait(500)
      cy.get('#username')
        .type('juissi')
      cy.get('#password')
        .type('johtaja')
      cy.contains('login')
        .click()
      cy.contains('Juissi Johtaja logged in')
      cy.visit('http://localhost:3000/#/')
    })
    it('a new blog can be created', function() {
      cy.contains('Create new blog')
        .click()
      cy.get('#title')
        .type('this is not a drill')
      cy.get('#author')
        .type('kumi keijo')
      cy.get('#url')
        .type('www.kumikeijo.fi')
      cy.contains('Save')
        .click()
      cy.contains('this is not a drill')
    })
  })

  describe('Blog: blog post actions', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000/#/')
      cy.wait(500)
    })
    it('created blog page can be opened', function() {
      cy.contains('this is not a drill')
        .click()
      cy.contains('this is not a drill')
    })
    it('comment can be added', function() {
      cy.contains('this is not a drill')
        .click()
      cy.get('#comment')
        .type('this blog is great')
      cy.contains('Add comment')
        .click()
      cy.contains('this blog is great')
    })
  })
})