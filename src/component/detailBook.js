import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client"
import { getSingleBook } from '../queries'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'


const BookDetails = props => {
    const params = useParams()
    const { loading, error, data } = useQuery(getSingleBook, { variables: { id: params.id } })

    const [dataVal, setData] = useState(null)
    useEffect(() => {
        if (!loading && !error) {
            setData(data)
        }
    }, [data, loading, error])
    if (loading) {
        return <>Loading...</>
    }
    if (error) {
        return <>error occured</>
    }
    const authorBooks = dataVal && dataVal.book.author.books
    return (
        <>
            {dataVal &&
                <>
                    <div className='aside'>
                        <h2>{dataVal.book.name}</h2>
                    </div>
                    <div className='book-details'>
                        <ul className="book-list">
                            <div>

                                <p>{dataVal.book.genre}</p>
                                <p>{dataVal.book.author.name}</p>
                                <p>All books by {dataVal.book.author.name}</p>
                                <ul className='other-books'>
                                    {authorBooks.map(el => <li key={el.id}>
                                        <Link to={`/${el.id}`}>{el.name}</Link>
                                    </li>)
                                    }
                                </ul>
                            </div>
                        </ul>
                    </div>
                </>
            }
        </>
    )
}
export default BookDetails