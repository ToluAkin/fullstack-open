const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Model import
const User = require('../models/user')

router.post('/', async (req, res) => {
    const body = req.body
    const user = await User.findOne({ username: body.username }).exec()

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'invalid username or password' })
    }

    const userForToken = { username: user.username, id: user._id }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router