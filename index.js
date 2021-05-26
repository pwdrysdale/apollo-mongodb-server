const { ApolloServer, gql } = require("apollo-server");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
