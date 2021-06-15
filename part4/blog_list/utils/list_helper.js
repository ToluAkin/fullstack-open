const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((a,b) => { return a + b })
}

module.exports = {
    totalLikes
}