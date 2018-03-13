import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

class Shelfes extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelfes.map((shelf) => (
              <Shelf
                key={shelf.value}
                shelf={shelf}
                books={this.props.books}
                onChangeShelf={this.props.onChangeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelfes
