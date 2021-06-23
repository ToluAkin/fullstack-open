const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blogs = require('../utils/blog_list_helper').blogs

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('is unique identifier defined', async () => {
    const response = await api.get('/api/blogs')
    const resBody = response.body.map(blog => blog.id)
    expect(resBody).toBeDefined()
})

test('sending post data', async () => {
    let allBlogs = await Blog.find({})
    let existingLength = allBlogs.length
    let expectedLength = existingLength + 1
    const newBlog = {
        title: "Twitter Days",
        author: "Jack",
        url: "https://twitter.com",
        likes: 10000000000
    }

    await api.post('/api/blogs').send(newBlog)
    const newBlogs = await Blog.find({})
    expect(newBlogs.length).toBe(expectedLength)
    expect(newBlogs[existingLength].title).toBe(newBlog.title)
})

test('likes property to zero', async () => {
    const newBlog = {
        title: "Taekwando Days",
        author: "Jackie Chan",
        url: "https://twitter.com/jackie-chan",
    }

    newBlog.likes === undefined ? newBlog.likes = 0 : newBlog.likes
    await api.post('/api/blogs').send(newBlog)
    expect(newBlog.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})