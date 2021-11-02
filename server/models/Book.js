const { Schema } = require('mongoose');

// Subdocument schema for User model when saving books
const bookSchema = new Schema({
  //one or more authors
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  //id of book (provided by Google Books API)
  bookId: {
    type: String,
    required: true,
  },
  //front cover of book, if available
  image: {
    type: String,
  },
  //link to book if available
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = bookSchema;
