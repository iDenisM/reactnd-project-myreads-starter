import React from 'react'
import ListBooks from './ListBooks'
import Shelfs from './Shelfs'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    shelfs: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
        // console.log(books);
      })
  }

  changeShelf = (book, shelf) => {
    /* Use the findIndex to see if the book is in the book array
    * if the value is less then 0 (ususaly -1) then there is no
    * book in the book array
    */
    const bookId = this.state.books.findIndex(b => b.id === book.id)
    // Check if the book is new or it exists in the book array
    bookId < 0 ? (
      // This is a new book
      this.setState((state) => state.books.concat([book]))
    ) : (
      // This is an existing book
      this.setState((state) => state.books[bookId].shelf = shelf)
    )
    BooksAPI.update({id: book.id}, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )}/>
        <Route exact path='/' render={() => (
          <Shelfs
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
