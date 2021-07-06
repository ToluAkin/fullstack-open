const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

//Model import
const Blog = require('../models/blog')
const User = require('../models/user')

//Middleware import
const userExtractor = require('../utils/middleware').userExtractor

//get request for all blogs
router.get('/', async(req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

//post request to create a blog
router.post('/', userExtractor, async (req, res) => {
    const body = req.body

    if (!body.title || !body.url) {
        return res.status(400).send({ error: 'title or url missing ' }).end()
    }
    const user = await User.findById(req.user.id)
    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        user: user._id
    })

    if (!blog.likes) blog.likes = 0

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

// Remove a blog
router.delete('/:id', userExtractor, async (req, res) => {
    const user = await User.findById(req.user.id)
    const blog = await Blog.findById(req.params.id)

    if (user._id.toString() === blog.user.toString()) {
        await blog.remove()
        user.blogs = user.blogs.filter(blog => blog.id.toString() !== req.params.id.toString())
        await user.save()
        res.status(204).end()
    } else {
        return res.status(401).json({ error: "you don't have the permission to delete this blog" })
    }
})

// updating a blog
router.put('/:id', async (req, res) => {
    const id = await req.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
    res.json(updatedBlog.toJSON())
})

module.exports = router