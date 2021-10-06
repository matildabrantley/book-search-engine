import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addSavedBook($bookInfo: BookInfo!) {
    addSavedBook(bookInfo: $bookInfo) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

