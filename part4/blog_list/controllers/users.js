const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const usernamePasswordVal = 3
//Model import
const User = require('../models/user')

//Get request for all users
router.get('/', async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

//post request to add users
router.post('/', async (req, res) => {
    const body = req.body
    const reqPassword = body.password
    const reqUsername = body.username
    if (reqPassword && reqUsername) {
        if (reqPassword.length > usernamePasswordVal && reqUsername > usernamePasswordVal) {
            const user = new User({
            username: reqUsername,
            name: body.name,
            passwordHash: reqPassword
        })

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(reqPassword, salt, function (err, hash) {
                user.passwordHash = hash
            })
        });
        const savedUser = await user.save()
        res.status(201).json(savedUser)
        } else {
            res.json({ error: 'username and password must be at least 3 characters long' }).status(400).end()
        }
        
    } else {
        res.status(400).json({ error: 'username or password is missing' }).end()
    }
})

module.exports = router