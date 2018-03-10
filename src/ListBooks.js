import React, { Component } from 'react'
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
      const books = this.props.books
      BooksAPI.search(query)
        .then(found => {
          found.map(foundBook => {
            foundBook.shelf = 'none'
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}>
                      </div>
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && (
                      book.authors.map((author) => (
                        <div key={author} className="book-authors">{author}</div>
                      ))
                    )}
                  </div>
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    )
  }
}


export default ListBooks
