const { gql } = require("apollo-server");

const typeDefs = gql`
    type Users {
        name: String
        _id: ID
    }

    type Book {
        _id: ID
        title: String
        author: Users
    }

    type Query {
        user(_id: ID): Users
        books: [Book]
        book(_id: ID): Book
        users: [Users]
    }

    type Mutation {
        user(name: String): Users
        book(title: String, author: ID): Book
    }
`;

module.exports = typeDefs;
