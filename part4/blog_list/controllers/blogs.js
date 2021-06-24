const express = require('express')
const router = express.Router()

//Model import
const Blog = require('../models/blog')

//get request for all blogs
router.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => { res.json(blogs) })
})

//post request to create a blog
router.post('/', (req, res) => {
    if (!req.body.title && !req.body.url) {
        res.status(400).end()
    } else {
        const blog = new Blog(req.body)
        blog.save()
            .then(result => { res.status(201).json(result) })
    }
  
})

module.exports = router