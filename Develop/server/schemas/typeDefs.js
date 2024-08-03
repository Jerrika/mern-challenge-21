// typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    image: String
    link: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!, description: String, image: String, link: String): Book
    removeBook(id: ID!): Book
  }
`;

module.exports = typeDefs;

