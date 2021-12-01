import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
                born
                bookCount
            }
            published
        }
    }
`

export const ALL_GENRE = gql`
    query AllGenre {
        allGenre
    }
`

export const SIGNED_IN_USER = gql`
    query SignedInUser {
        me {
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
                name
                born
                bookCount
            }
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }
`