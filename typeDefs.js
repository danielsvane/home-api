const { gql } = require('apollo-server')

module.exports = gql`
type Location {
  lon: Number
  lat: Number
  alt: Number
}

type Home {
  id: ID
  description: String
  location: Location
}

type Query {
  homes: [Home]
}

type Subscription {
  homeAdded: Home
  homeRemoved: ID
}

type Mutation {
  """ Adds a new home to the database """
  addHome(description: String): Home
  removeHome(id: ID): ID
}
`
