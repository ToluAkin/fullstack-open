const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const helper = require('../utils/blog_list_helper')

jest.setTimeout(100000)
describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const initialUser = {
            name: "Robert C. Martin",
            username: "Martin",
            password: "architecture",
            blogs: helper.blogs[0]._id
        }
        const user = new User({ initialUser })
        const salt = await bcrypt.genSalt(10)
        user.passwordHash = await bcrypt.hash(initialUser.password, salt)

        await user.save()
  })

    test('invalid users are not created', async () => {
        const usersAtStart = await helper.dataInDb(User)

        const newUser = {
            name: 'perpetual',
            username: 'chris',
            blogs: helper.blogs[0]._id
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

    test('invalid add user', async () => {
        const usersAtStart = await helper.dataInDb(User)

        const newUser = {
            name: 'perpetual',
            username: 'ch',
            password: '1',
            blogs: helper.blogs[0]._id
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toContain('username and password must be at least 3 characters long')

        const usersAtEnd = await helper.dataInDb(User)
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})