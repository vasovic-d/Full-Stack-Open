const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app