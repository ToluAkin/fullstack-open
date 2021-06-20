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

const mostBlogs = blogs => { }

module.exports = {
    totalLikes, favoriteBlog, mostBlogs
}