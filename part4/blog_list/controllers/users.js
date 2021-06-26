const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs');

//Model import
const User = require('../models/user')

//Get request for all users
router.get('/', async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

//post request to add users
router.post('/', async(req, res) => {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = router