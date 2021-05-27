import { gql } from '@urql/core';

// LOGIN mutation
export const LOGIN = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          id
          name
          description
          type
        }
      }
    }
  }
`;

// Create a record in 'juventus' content-type
export const CREATEJUVENTUS = gql`
  mutation CreateJuventus($input: createJuventusInput) {
    createJuventus(input: $input) {
      juventus {
        id
      }
    }
  }
`;
