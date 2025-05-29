const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  console.log('Test database initialized with initial blogs')
})

describe('when there is initially some blogs saved', () => {

  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the unique identifier property is named id and not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })
  describe('adding a new blog', () => {

    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'https://example.com/new-blog',
        likes: 3,
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
      assert.ok(titles.includes(newBlog.title))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('if likes is missing, it defaults to 0', async () => {
      const blogNoLikes = {
        title: 'Blog Without Likes',
        author: 'Petar Mudic',
        url: 'https://example.io/blog-without-likes',
      }

      await api
        .post('/api/blogs')
        .send(blogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const addedBlog = blogsAtEnd.find(blog => blog.title === blogNoLikes.title)
      assert.ok(addedBlog)
      assert.strictEqual(addedBlog.likes, 0)
    })

    test('blog without title and/or url is not added with statuscode 400', async () => {
      const blogWithoutTitle = {
        author: 'Author Without Title',
        url: 'https://notitle.com/no-title',
        likes: 5,
      }

      const blogWithoutUrl = {
        title: 'Blog Without URL',
        author: 'Author Authorovich',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deleting a blog', () => {

    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[1]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.ok(!blogsAtEnd.map(blog => blog.title).includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {

    test('a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(updatedBlog.likes, blogsAtStart[0].likes + 1)

      const blogsAtEnd = await helper.blogsInDb()
      assert.ok(blogsAtEnd.map(blog => blog.title).includes(blogToUpdate.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('Test database connection closed')
})