const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

//Model import
const User = require('../models/user')
const Blog = require('../models/blog')

//Get request for all users
router.get('/', async(req, res) => {
    const users = await User.find({}).populate('blogs', { author: 1, title: 1 })
    res.json(users)
})

//post request to add users
router.post('/', async (req, res) => {
    const body = await req.body
    const reqPassword = body.password
    const reqUsername = body.username
    const usernamePasswordVal = 3

    if (reqPassword && reqUsername) {
        if ((reqPassword.length < usernamePasswordVal) && (reqUsername < usernamePasswordVal)) {
            res.status(400).json({ error: 'username and password must be at least 3 characters long' }).end()
        } else {
            const blog = await Blog.findById(body.blogId)
            const user = await new User({
                username: reqUsername,
                name: body.name,
                passwordHash: reqPassword,
                blogs: blog._id
            })
            const salt = await bcrypt.genSalt(10)
            user.passwordHash = await bcrypt.hash(reqPassword, salt)

            const savedUser = await user.save()
            blog.user = blog.user.concat(savedUser._id)
            await blog.save()

            res.status(201).json(savedUser)
        } 
    } else {
        res.status(400).json({ error: 'username or password is missing' }).end()
    }
})

module.exports = router