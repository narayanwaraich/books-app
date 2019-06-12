import React from 'react';

function BookList({searchText,books}){
  if (typeof books === 'undefined') {
    return (<p>No results were found for '{searchText}'</p>)
  } else {
    return(
      <div className="bookList">
        {books.map((book) => {
          let bookInfo = book.volumeInfo;
          return(
            <div className="book" key={book.id}>
              <div className="thumbnail">
                <img src={(typeof bookInfo.imageLinks !== 'undefined') && bookInfo.imageLinks.smallThumbnail} />
              </div>
              <div className="content">
                <h1 className="title">
                  <a href={bookInfo.previewLink}>{bookInfo.title}</a>
                </h1>
                <i>{(typeof bookInfo.categories !== 'undefined') && bookInfo.categories.join(", ")}</i>
                <p className="description">{bookInfo.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default BookList;
