//import { HttpLink } from "apollo-link-http";
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloProvider } from "@apollo/client/react";

import { Users } from "./components/Users";
import { AddUser } from "./components/AddUser";
import { UsersSubscription } from "./components/UsersSubscription";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/",
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
        reconnect: true,
    },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Users />
            <AddUser />
            <UsersSubscription />
        </ApolloProvider>
    );
}

export default App;
