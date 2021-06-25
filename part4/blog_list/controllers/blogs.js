const express = require('express')
const router = express.Router()

//Model import
const Blog = require('../models/blog')

//get request for all blogs
router.get('/', async(req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

//post request to create a blog
router.post('/', async(req, res) => {
    if (!req.body.title && !req.body.url) {
        res.status(400).end()
    } else {
        const blog = new Blog(req.body)
        const savedBlog = await blog.save()
        res.status(201).json(savedBlog)
    }
})

// Remove a blog
router.delete('/:id', async (req, res) => {
    const id = await req.params.id
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
})

// updating a blog
router.put('/:id', async (req, res) => {
    const id = await req.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updatedBlog)
})
module.exports = router