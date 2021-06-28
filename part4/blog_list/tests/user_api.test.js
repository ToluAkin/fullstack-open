const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const helper = require('../utils/blog_list_helper')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const initialUser = {
            name: "Robert C. Martin",
            username: "Martin",
            password: "architecture"
        }
        const user = new User({ initialUser })
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(initialUser.password, salt, function (err, hash) {
                user.passwordHash = hash
            })
        });
        await user.save()
  })

    test('invalid username or password', async () => {
        const usersAtStart = await helper.dataInDb(User)

        const newUser = {
            name: 'perpetual',
            username: 'chris'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toContain('username or password is missing')

        const usersAtEnd = await helper.dataInDb(User)
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})