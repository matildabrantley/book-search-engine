import { gql } from '@apollo/client';

export const QUERY_THIS_USER = gql`
  {
    thisUser {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        link
        image
      }
    }
  }
`;
