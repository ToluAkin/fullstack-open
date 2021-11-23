const { ApolloServer, UserInputError, gql } = require("apollo-server")
const mongoose = require("mongoose")
const { v1: uuid } = require("uuid")

const Book = require('./models/Book')
const Author = require('./models/Author')

const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

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
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(title: String!, author: String!, published: Int!, genres: [String!]!): bookAuthor
        editAuthor(name: String!, setBornTo: Int!): authorPerson
    }
`
const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async(root, args) => {
            if (args.genre) { // if genre is provided as well as both genre and author to filter
                const allTitles = []
                const filteredBooks = books.filter(book =>
                    args.author
                        ? book.genres.filter(genre => genre === args.genre) && book.author === args.author
                        : book.genres.filter(genre => genre === args.genre))
                filteredBooks.map(theBook => allTitles.push({ title: theBook.title, author: theBook.author}))
                return allTitles
            } else if (args.author) { // if just author is provided
                const author = await Author.findOne({ name: args.author.toLowerCase() })
                if (author) {
                    const books = await Book.find({ author: author.id }).populate('author', { name: 1, born: 1 })
                    books.map(book => book.author.bookCount = books.length)
                    return books
                } else {
                    return null
                }
            } else {
                const allBooks = await Book.find({}).populate('author', { name: 1, born: 1 })
                return allBooks
            }
        },
        
        allAuthors: async () => {
            const allAuthors = await Author.find({})
            return allAuthors
        }
    },

    Mutation: {
        addBook: async (root, args) => {
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
        
        editAuthor: async (root, args) => {
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
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers, })

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})