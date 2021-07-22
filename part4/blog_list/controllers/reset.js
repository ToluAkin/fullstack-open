const express = require('express')
const router = express.Router()

//models
const blog = require('../models/blog')
const user = require('../models/user')

router.post('/', async (request, res) => {
  await blog.deleteMany({})
  await user.deleteMany({})

  res.status(204).end()
})

module.exports = router