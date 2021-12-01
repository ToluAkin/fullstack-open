const { ApolloServer, UserInputError, AuthenticationError, gql } = require("apollo-server")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

// Models
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
// Utils
const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)
// Database connection
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB 🚀 🚀')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
// GraphQL Schema
const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type bookAuthor {
        title: String!
        author: Author!
    }

    type authorPerson {
        name: String!
        born: Int!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String genre: String): [Book]
        allAuthors: [Author!]!
        me: User
        allGenre: [String]!
    }

    type Mutation {
        addBook(title: String! author: String! published: Int! genres: [String!]!): bookAuthor
        editAuthor(name: String! setBornTo: Int!): authorPerson
        createUser(username: String! favoriteGenre: String!): User
        login(username: String! password: String!): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        me: (root, args, context) => { return context.currentLoggedInUser }, // accessing the logged in user from context
        allBooks: async (root, args) => {
            if (args.genre) { // if genre is provided as well as both genre and author to filter
                const booksGenre = await Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1 })
                return booksGenre
            } else if (args.author) { // if just author is provided, all the author's book titles are returned
                const author = await Author.findOne({ name: args.author.toLowerCase() })
                if (author) {
                    let allTitles = []
                    const books = await Book.find({ author: author.id })
                    books.map(book => allTitles.push({ title: book.title }))
                    return allTitles
                }
            } else {
                const allBooks = await Book.find({}).populate('author', { name: 1, born: 1 })
                return allBooks
            }
        },
        
        allAuthors: async () => {
            const allAuthors = await Author.find({})
            const allBooks = await Book.find({})
            const authorCount = []
            allAuthors.map(author => authorCount.push({ name: author.name, id: author.id, born: author.born }))
            allBooks.map(book =>
                authorCount.filter((author, i) =>
                    author.id == book.author
                        ? authorCount[i].bookCount += 1
                        : authorCount[i].bookCount = 1)
            )
    
            return authorCount
        },

        allGenre: async () => {
            const genres = await Book.distinct('genres')
            return genres
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const loggedInUser = context.currentLoggedInUser
            if (!loggedInUser) {
                return new AuthenticationError('not authenticated')
            }

            let bookAuthor
            let existingAuthor = await Author.findOne({ name: args.author.toLowerCase() })

            if (existingAuthor) {
                const newBook = new Book({ ...args, author: existingAuthor.id.toString() })

                try {
                    await newBook.save()
                    const { name, born } = existingAuthor
                    const allBooks = await Book.find({ author: existingAuthor.id })
                    bookAuthor = { title: newBook.title, author: { name, born, bookCount: allBooks.length } }
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args })
                }
            } else {
                const { title, published, genres } = args 

                try {
                    const authorObject = { name: args.author.toLowerCase(), born: null }
                    const newAuthor = new Author(authorObject)
                    await newAuthor.save()
                    const newBook = new Book({ title, published, genres, author: newAuthor.id.toString() })
                    await newBook.save()

                    bookAuthor = { title: newBook.title , author: { ...authorObject, bookCount: 0 } }
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args })
                }
            }
            return bookAuthor
        },
        
        editAuthor: async (root, args, context) => { // edit a author's DOB
            const loggedInUser = context.currentLoggedInUser
            if (!loggedInUser) {
                return new AuthenticationError('not authenticated')
            }

            let author = await Author.findOne({ name: args.name.toLowerCase() })
            if (author) {
                let newAuthorData
                author.born = args.setBornTo
                
                try {
                    await author.save()
                    newAuthorData = { name: author.name, born: author.born }
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args })
                }
                return newAuthorData
            } else {
                return null
            }
        },

        createUser: async (root, args) => {
            const { username, favoriteGenre } = args
            const user = new User({ username, password: 'secret', favoriteGenre })
            return await user.save()
                .catch(error => {
                    throw new UserInputError(error.message, { invalidArgs: args })
                })
        },

        login: async (root, args) => {
            const { username, password } = args
            const user = await User.findOne({ username, password })

            if (!user || password !== 'secret') throw new UserInputError("wrong credentials")
            
            const userForToken = { username: user.username, id: user.id }
            return { value: jwt.sign(userForToken, config.JWT_SECRET) }
        }
    }
}

// setting up a new GraphQL server
const server = new ApolloServer({
    typeDefs, resolvers, context: async ({ req }) => { // Context is the right place to do things which are shared by multiple resolvers
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
            const currentLoggedInUser = await User.findById(decodedToken.id)
            return { currentLoggedInUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${ url }`)
})