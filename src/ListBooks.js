import React, { Component } from 'react'

class ListBooks extends Component {
  render() {
    return (
      /*
      * Create an ordered list of all the books in the API
      * Loop through all the found books and create UI
      * Give unique ids to the list elements
      * Give unique ids to the authors div elements
      */
      <ol className="books-grid">
        {this.props.books.map((book) => (
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
              {book.authors.map((author) => (
                <div key={author} className="book-authors">{author}</div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default ListBooks
