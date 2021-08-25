const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  _id: ID
  title: String
  authors: [String]
  description: String
  bookId: String
  link: String
  image: String
}

type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Query {
  thisUser: User
}

input BookInfo {
  title: String
  authors: [String]
  description: String
  bookId: String
  link: String
  image: String
}

type Mutation  {
  register(username: String!, email: String, password: String!): User
  addSavedBook(bookInfo: BookInfo!): User
}
`;

module.exports = typeDefs;
