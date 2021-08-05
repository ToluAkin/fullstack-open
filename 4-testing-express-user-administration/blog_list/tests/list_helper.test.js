const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blog_list_helper').blogs

describe('blogs detail on likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('blog with highest likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })

    test('blog with with mot likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
    })

})

describe('most blogs', () => {
    test('author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 })
    })
})
