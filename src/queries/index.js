import { gql } from '@apollo/client'

const getAutors = gql`
{
   authors{
   id,
   name
}
 }
`
const getAllBooks = gql`
query{
  books{
    name,
    id
  }
}
`
const createBook = gql`
    mutation($name:String!,$genre:String!,$author:String!)
    {
         createBook(name:$name,genre:$genre,author:$author){
            name
         }
    }
`
const getSingleBook = gql`
query($id : ID!){
    book(id : $id){
        name,
        genre,
        author {
            name,
            books{
                name,
                id
            }
        }
    }
  }
`




export {
    getAutors,
    getAllBooks,
    createBook,
    getSingleBook
}