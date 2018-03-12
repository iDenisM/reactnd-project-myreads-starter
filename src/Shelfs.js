import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class Shelfs extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(b => b.shelf === 'currentlyReading').map(b => (
                    <Book
                      key={b.id}
                      book={b}
                      onChangeShelf={this.props.onChangeShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(b => b.shelf === 'wantToRead').map(b => (
                    <Book
                      key={b.id}
                      book={b}
                      onChangeShelf={this.props.onChangeShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.filter(b => b.shelf === 'read').map(b => (
                    <Book
                      key={b.id}
                      book={b}
                      onChangeShelf={this.props.onChangeShelf}
                    />
                  ))}
                </ol>
              </div>
            </div>
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

export default Shelfs
