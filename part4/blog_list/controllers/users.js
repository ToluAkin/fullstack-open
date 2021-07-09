const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

//Model import
const User = require('../models/user')

//Get request for all users
router.get('/', async(req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1,  likes: 1, author: 1 })
    res.json(users.map(user => user.toJSON()))
})

//post request to add users
router.post('/', async (req, res) => {
    const { password, name, username } = req.body
    const usernamePasswordVal = 3

    if (password && username) {
        if ((password.length < usernamePasswordVal) || (username < usernamePasswordVal)) {
            return res.status(400).json({ error: 'username and password must be at least 3 characters long' }).end()
        }
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const user = await new User({ "username": username.toLowerCase(), name, passwordHash })

        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } else {
        res.status(400).json({ error: 'username or password is missing' }).end()
    }
})

module.exports = router