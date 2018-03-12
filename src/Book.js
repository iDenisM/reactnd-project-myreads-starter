import React, { Component } from 'react'

class Book extends React.Component {
  // Shelf change method
  handleChangeShelf = (event) => {
    this.props.onChangeShelf && this.props.onChangeShelf(this.props.book, event.target.value)
    console.log(`Shelf to ${event.target.value}`);
  }

  // Render the component
  render() {
    const book = this.props.book
    return (
      <li>
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
              {
                /* Set the selector to None if not in shelf
                * if in shelf then use the correct shelf selector
                */
              }
              <select
                value={book.shelf || 'none'}
                onChange={this.handleChangeShelf}
              >
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
    )
  }
}

export default Book
