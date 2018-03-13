import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    foundBooks: [],
    noBooksFound: false
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query) {
      this.setState({ noBooksFound: false })
      BooksAPI.search(query)
        .then(found => {
          found.map(foundBook => {
            /* Check if the found book is in the users shelf
            * if not then the shelf is none
            */
            let bookId = this.props.books.findIndex((b) => b.id === foundBook.id)
            bookId < 0 ? foundBook.shelf = 'none' : foundBook.shelf = this.props.books[bookId].shelf
          })
          return this.setState({ foundBooks: found })
        })
        .catch((err) => {
          console.log('Some Error', err);
          return this.setState({
            foundBooks: [],
            noBooksFound: true
          })
        })
    } else {
      this.setState({ foundBooks: [] })
    }
  }

  render() {
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
        {
          /*
          * Creates an ordered list of all the books found from search match
          * Loops through all the found books and create UI
          * Gives unique ids to the list elements
          * Gives unique ids to the authors div elements
          * If no books found then render message on the screen
          */
        }
          <ol className="books-grid">
            {this.state.noBooksFound ? (
              <div>NO BOOKS FOUND</div>

            ) : (
              this.state.foundBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onChangeShelf={this.props.onChangeShelf}
                />
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}


export default ListBooks
