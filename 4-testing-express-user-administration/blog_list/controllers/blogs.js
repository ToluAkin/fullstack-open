const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//Model import
const Blog = require('../models/blog')
const User = require('../models/user')

//get request for all blogs
router.get('/', async(req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

//post request to create a blog
router.post('/',  async (req, res) => {
    const blog = new Blog(req.body)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) return res.status(401).json({
        error: 'token missing or invalid'
    })
    
    if (!blog.title || !blog.url) return res.status(400).send({
        error: 'title or url missing'
    }).end()

    const user = await User.findById(decodedToken.id)
    if (!blog.likes) blog.likes = 0

    blog.user = user.id
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})

// Remove a blog
router.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if (user._id.toString() !== blog.user.toString()) return res.status(401).json({
        error: "you don't have the permission to delete this blog"
    })

    await blog.remove()
    user.blogs = user.blogs.filter(blog => blog.id.toString() !== req.params.id.toString())
    await user.save()
    res.status(204).end()
})

// updating a blog
router.put('/:id', async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedBlog.toJSON())
})

module.exports = router