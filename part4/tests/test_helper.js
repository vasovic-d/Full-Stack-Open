const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Monk Monkey',
    url: 'https://example.com/first-blog',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Sage Squirrel',
    url: 'https://example.com/second-blog',
    likes: 10,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
module.exports = { initialBlogs, blogsInDb }