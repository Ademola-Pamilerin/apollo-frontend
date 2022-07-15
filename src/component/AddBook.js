import React, { useRef } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { getAutors, createBook, getAllBooks } from '../queries'


function AddBook() {
    const nameRef = useRef()
    const genreRef = useRef()
    const authorRef = useRef()


    const { loading, error, data } = useQuery(getAutors)
    const [sendData] = useMutation(createBook)

    const Author = () => {
        if (loading) {
            return <option disabled>Loading Author</option>
        }
        if (error) {
            return <option disabled>An error occured</option>
        }
        return (data.authors.map(el => <option value={el.id} key={el.id}>{el.name}</option>))
    }
    const Submitted = (event) => {
        event.preventDefault()
        const nameVal = nameRef.current.value
        const genreVal = genreRef.current.value
        const authorVal = authorRef.current.value

        sendData({
            variables: { name: nameVal, author: authorVal, genre: genreVal },
            onCompleted: (data) => {
                console.log(data)
            },
            refetchQueries: [{ query: getAllBooks }]
        })
        nameRef.current.value = "";
        authorRef.current.value = "";
        genreRef.current.value = "";
    }
    return (
        <>
        
        <form id='add-block' onSubmit={Submitted}>
            <div className='field'>
                <label>Book Name: </label>
                <input type={"text"} required={true} ref={nameRef} />
            </div>
            <div className='field'>
                <label>Genre: </label>
                <input type={"text"} required={true} ref={genreRef} />
            </div>
            <div className='field'>
                <label>Author: </label>
                <select ref={authorRef}>{Author()}</select>

            </div>
            <button onClick={Submitted}>+</button>
        </form></>
    )
}

export default AddBook