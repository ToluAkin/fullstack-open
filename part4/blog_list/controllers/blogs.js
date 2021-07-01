const express = require('express')
const router = express.Router()

//Model import
const Blog = require('../models/blog')
const User = require('../models/user')

//get request for all blogs
router.get('/', async(req, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
})

//post request to create a blog
router.post('/', async (req, res) => {
    const body = req.body
    if (!body.title && !body.url) {
        res.status(400).end()
    } else {
        const user = await User.findById(body.userId)
        const blog = new Blog({
            title: body.title,
            url: body.url,
            author: body.author,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

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