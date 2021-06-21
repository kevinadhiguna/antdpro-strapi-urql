import { gql } from '@urql/core';

// LOGIN mutation for authentication
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

// Create a record in 'juventus' content-type to add a Juventus player
export const ADDJUVENTUSPLAYER = gql`
  mutation AddJuventusPlayer($input: createJuventusInput) {
    createJuventus(input: $input) {
      juventus {
        id
        name
        number
        age
        country
        appearences
        goals
        minutesPlayed
        position
        profpic {
          name
          url
        }
      }
    }
  }
`;

// Upload a profile picture
export const UPLOADPROFPIC = gql`
  mutation UploadProfpic($refId: ID, $ref: String, $field: String, $file: Upload!) {
    upload(refId: $refId, ref: $ref, field: $field, file: $file) {
      id
      createdAt
      updatedAt
      alternativeText
      caption
      width
      height
      formats
      hash
      ext
      mime
      size
      url
    }
  }
`;
