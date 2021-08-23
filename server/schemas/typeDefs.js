const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  _id: ID
  author: String
}

type Query {
  books: [Book]!
  book(profileId: ID!): Book
}
`;

module.exports = typeDefs;
