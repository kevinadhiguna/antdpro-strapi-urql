// USERS query to get all users
export const USERS = `
  query getUsers {
    users {
      id
      username
      email
      confirmed
      blocked
      role {
        name
      }
      profpic {
        url
      }
    }
  }
`;

// USER query to get current user info
export const USER = `
  query User($id: ID!) {
    user(id: $id) {
      id
      createdAt
      updatedAt
      username
      email
      provider
      confirmed
      blocked
      role {
        name
      }
      profpic {
        name
        alternativeText
        url
        previewUrl
        provider
      }
    }
  }
`;

// JUVENTUS query to get all data in Juventus collection-type
export const JUVENTUS = `
  query getJuventusPlayers {
    juventuses {
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
        url
      }
    }
  }
`;
