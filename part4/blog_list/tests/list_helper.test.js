const listHelper = require('../utils/list_helper')
const blogs = require('../utils/blog_list_helper').blogs

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('highest likes', () => {
  test('blog with highest likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

// describe('most blogs', () => {
//     test('author with most blogs', () => {
//         const result = listHelper.mostBlogs(blogs)
//         expect(result).toEqual({
//             author: "Robert C. Martin",
//             blogs: 3
//         })
//     })
// })