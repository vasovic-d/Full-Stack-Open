const lodash = require('lodash')

const dummy = blogs => {
  if (blogs) {
    return 1
  }
}

const totalLikes = blogs => blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => blogs.length === 0 ? {} : blogs.reduce((top, blog) => blog.likes > top.likes ? blog : top)

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return 0
  } else {
    const countByAuthor = lodash.countBy(blogs, blog => blog.author)
    const authorMostPosts = Object.entries(countByAuthor).map(([author, blogs]) => ({ author, blogs }))
    return lodash.maxBy(authorMostPosts, 'blogs')
  }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  } else {
    const groupByAuthor = lodash.groupBy(blogs, 'author')
    const likesPerAuthor = Object.entries(groupByAuthor).map(([author, blogs]) => ({ author, likes: lodash.sumBy(blogs,'likes') }))
    return lodash.maxBy(likesPerAuthor, 'likes')
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}