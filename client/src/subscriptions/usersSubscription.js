import { gql } from "@apollo/client";

export const NEW_USER_SUBSCRIPTION = gql`
    subscription {
        newUser {
            name
            _id
        }
    }
`;
