const { ApolloServer, gql } = require("apollo-server")
const { v4: uuid } = require('uuid');

let authors = [
    {
        name: "Robert Martin",
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: "Martin Fowler",
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: "Fyodor Dostoevsky",
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: "Joshua Kerievsky", // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: "Sandi Metz", // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * It might make more sense to associate a book with its author by storing the author"s name in the context of the
 * book instead of the author"s id. However, for simplicity, we will store the author"s name in connection with the book
*/

let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"]
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ["agile", "patterns", "design"]
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"]
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "patterns"]
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "design"]
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "crime"]
    },
    {
        title: "The Demon ",
        published: 1872,
        author: "Fyodor Dostoevsky",
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "revolution"]
    },
]

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  
  type AuthorBook {
    title: String!
  }
  
  type bookGenre {
    title: String!
    author: String!
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
    allAuthorBooks(name: String!): [AuthorBook!]!
  }
  
  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): bookGenre
    editAuthor(name: String!, setBornTo: Int!): authorPerson
  }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (args.genre) { //if genre is provided as well as both genre and author to filter
                const allTitles = []
                const filteredBooks = books.filter(book =>
                    args.author
                        ? book.genres.filter(genre => genre === args.genre) && book.author === args.author
                        : book.genres.filter(genre => genre === args.genre))
                filteredBooks.map(theBook => allTitles.push({ title: theBook.title, author: theBook.author}))
                return allTitles
            } else if (args.author) { // if just author is provided
                const allTitles = []
                books.filter(book => book.author === args.author).map(theBook => allTitles.push({ title: theBook.title }))
                return allTitles
            } else {
                return books
            }
        },
        allAuthors: () => {
            let booksAndAuthors
            booksAndAuthors = books.map(book => { // merge books and authors array to get the author's year of birth
                let bookAuthors = authors.find(author => author.name === book.author)
                return { ...book, born: bookAuthors?.born }
            })
            const authorCount = []
            booksAndAuthors.map((book) => { // use merged array to count the author's books
                const existingAuthor = authorCount.find(author => book.author === author.name)
                if (existingAuthor) {
                    existingAuthor.bookCount += 1
                } else {
                    authorCount.push({ name: book.author, born: book?.born, bookCount: 1 })
                }
            })
            return authorCount
        }
    },

    Mutation: {
        addBook: (root, args) => {
            let newBook
            let bookId = uuid() // create id for the new book and non existing authors
            books.filter(book => {
                if (args.author !== book.author) // add new author for the new book
                    authors = authors.concat({ name : args.author, id : bookId, born : null })
                newBook = { ...args, id: bookId }
                return books
            })
            books = books.concat(newBook)
            return newBook
        },
        editAuthor: (root, args) => {
            let authorData = authors.find(author => author.name === args.name)
            if (authorData) {
                let newAuthorData
                authors.map((author, index) => {
                    if (author.name === args.name) {
                        authors[index] = { ...authorData, born: args.setBornTo }
                        return newAuthorData = authors[index]
                    } else {
                        return author
                    }
                })
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