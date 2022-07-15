import React from 'react'
import { useQuery } from "@apollo/client"
import { getAllBooks } from '../queries'
import { Link } from 'react-router-dom'


const BookComponent = props => {
    const { loading, error, data } = useQuery(getAllBooks)

    const fetchData = () => {
        if (loading) {
            return <>Loading...</>
        }
        if (error) {
            return <>error occured</>
        }
        return (data.books.map(el => <li key={el.id}><Link to={`/${el.id}`}> {el.name} </Link></li>))
    }

    return (
        <ul className="book-list">
            {fetchData()}
        </ul>
    )
}


export default BookComponent