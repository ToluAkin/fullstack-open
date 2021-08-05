const totalLikes = blogs => {
    return blogs.map(blog => blog.likes).reduce((a,b) => { return a + b })
}

const favoriteBlog = blogs => {
    let maxValue = Math.max(...blogs.map(blog => blog.likes))
    let match = blogs.filter(blog => blog.likes == maxValue)

    return {
        "title": match[0].title,
        "author": match[0].author,
        "likes": match[0].likes
    }
}

const mostBlogs = blogs => {
    // const maxAuthor = authorNames.reduce((prev, cur) => (prev.y > cur.y) ? prev : cur)
    const keysAndValues = blogs.reduce((prev, cur) => {
        prev[cur.author] = (prev[cur.author] || 0) + 1;
        return prev;
    }, {});
    const maxAuthor = Object.entries(keysAndValues).reduce((prev, cur) => (prev[1] > cur[1]) ? prev : cur)
    return { author: maxAuthor[0], blogs: maxAuthor[1] }
}

const mostLikes = blogs => {
    const keysAndValues = blogs.reduce((prev, cur) => {
        prev[cur.author] = (prev[cur.author] || 0) + cur.likes;
        return prev;
    }, {});
    const maxAuthorData = Object.entries(keysAndValues).reduce((prev, cur) => (prev[1] > cur[1]) ? prev : cur)
    return { author: maxAuthorData[0], likes: maxAuthorData[1] }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }