import React from 'react'
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, SIGNED_IN_USER } from "../queries";

const Recommendation = props => {
    const user = useQuery(SIGNED_IN_USER)
    const result = useQuery(ALL_BOOKS, {
        variables: { genre: user?.data?.me?.favoriteGenre },
    })

    if (!props.show) {
        return null
    }

    if (result.loading || user.loading) {
        return <div>Loading...</div>
    }

    const books = result.data.allBooks

    return(
        <div>
            <h3>Recommendations</h3>
            <p>Books in your favourite genre <strong>{ user?.data?.me?.favoriteGenre || '' }</strong></p>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                { books.map(book =>
                    <tr key={ book.title }>
                        <td>{ book.title }</td>
                        <td>{ book.author.name.charAt(0).toUpperCase() + book.author.name.slice(1) }</td>
                        <td>{ book.published }</td>
                    </tr>
                ) }
                </tbody>
            </table>
        </div>
    )
}

export default Recommendation