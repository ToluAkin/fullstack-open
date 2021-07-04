const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('../utils/blog_list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

describe('viewing blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('is unique identifier defined', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const resBody = response.body.map(blog => blog.id)
        expect(resBody).toBeDefined()
    })
})


describe('addition of blog details', () => {
    test('sending post data', async () => {
        const newBlog = {
            title: "Twitter Days",
            author: "Jack",
            url: "https://twitter.com",
            likes: 10000000000,
            blogs: helper.blogs[0]._id
        }

        const response = await api.post('/api/blogs')
            .send(newBlog)
            .set({'Authorization': 'random'}) 
            .expect(401)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toContain('token missing or invalid')
    })

    test('likes property to zero', async () => {
        const newBlog = {
            title: "Taekwando Days",
            author: "Jackie Chan",
            url: "https://twitter.com/jackie-chan",
        }

        newBlog.likes === undefined ? newBlog.likes = 0 : newBlog.likes
        
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        expect(newBlog.likes).toBe(0)
    })

    test('incomplete blog object', async () => {
        const newBlog = { author: "Chains", likes: 10000000000 }
        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.statusCode).toBe(400)
    })
})

describe('updating a specific blog', () => {
    test('deleting a blog', async () => {
        const allBlogs = await helper.dataInDb(Blog)
        const newBlog = {
            title: "Breakup songs",
            author: "Taylor Swift",
            url: "https://taylorswift.me",
            likes: 10000000000
        }

        const response = await api.post('/api/blogs').send(newBlog)
        const deletedBlog = await api.delete(`/api/blogs/${response.body.id}`)
        
        expect(deletedBlog.statusCode).toBe(204)
        expect(allBlogs).not.toContain(newBlog)
    })

    test('updating a blog', async () => {
        const allBlogs = await helper.dataInDb(Blog)
        const blogToChange = allBlogs[0]
        const blogUpdate = {
            title: "Breakup songs",
            author: "Taylor Swift",
            url: "https://taylorswift.me",
        }

        const response = await api.put(`/api/blogs/${blogToChange.id}`)
            .send(blogUpdate)
            .expect('Content-Type', /application\/json/)
        expect(response.body.title).toContain(blogUpdate.title)
        expect(response.body.author).toContain(blogUpdate.author)
        expect(response.body.url).toContain(blogUpdate.url)
    })
})

afterAll(() => {
    mongoose.connection.close()
})