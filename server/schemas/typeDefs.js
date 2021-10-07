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

type Auth {
  token: ID!
  user: User
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
  register(username: String!, email: String, password: String!): Auth
  login(email: String!, password: String!): Auth
  addSavedBook(bookInfo: BookInfo!): User
  removeSavedBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
