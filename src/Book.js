import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  // Shelf select change option method
  handleChangeShelf = (event) => {
    this.props.onChangeShelf && this.props.onChangeShelf(this.props.book, event.target.value)
  }

  // Render the component
  render() {
    const {book} = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail })`
              }}>
            </div>
            <div className="book-shelf-changer">
              {
                /* Set the selector to None if no shelf assigned
                * if in shelf then use the correct shelf selector
                */
              }
              <select
                value={book.shelf || 'none'}
                onChange={this.handleChangeShelf}
              >
                <option value="noValue" disabled>Move to...</option>
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
    )
  }
}

Book.PropTypes = {
  book: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Book
