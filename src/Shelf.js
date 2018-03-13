import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter((b) => b.shelf === this.props.shelf.value)
              .map((b) => (
                <Book
                  key={b.id}
                  book={b}
                  onChangeShelf={this.props.onChangeShelf}
                />
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
