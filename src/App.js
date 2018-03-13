import React from 'react'
import ListBooks from './ListBooks'
import Shelfs from './Shelfs'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  changeShelf1 = (book, shelf) => {
  }

  changeShelf = (book, shelf) => {
    /* Use the findIndex to see if the book is in the book array
    * if the value is less then 0 (ususaly -1) then there is no
    * book in the book array
    */
    const bookId = this.state.books.findIndex(b => b.id === book.id)
    // Check if the book is new or it exists in the book array
    if (bookId < 0) {
      book.shelf = shelf
      // This is a new book
      this.setState((state) => state.books.push(book))
      console.log(book.shelf)
      console.log(this.state.books)
    } else {
      // This is an existing book
      this.setState((state) => state.books[bookId].shelf = shelf)
    }
    /* Check if any book with shelf none has lave in the
    * state book array if so delete it from the array
    */
    this.setState((state) => (state.books.filter((b) => b.shelf !== 'none')))
    BooksAPI.update({id: book.id}, shelf)
    console.log(this.state.books)
  }

  render() {
    const shelfs = [{
      name: 'Currently Reading',
      value: 'currentlyReading'
    }, {
      name: 'Want to read',
      value: 'wantToRead'
    }, {
      name: 'Read',
      value: 'read'
    }]

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
            shelfs={shelfs}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
