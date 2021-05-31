import { gql } from "@apollo/client";

export const USER_ADD = gql`
    mutation ADD_USER($name: String) {
        user(name: $name) {
            name
            _id
        }
    }
`;
