import React from "react";
import { useQuery } from "@apollo/client";

import { GET_USERS } from "../queries/getUsers";

export const Users = () => {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    return (
        <div>
            <h1>Users - By Query</h1>
            {data.users.map((u) => (
                <div key={u._id}>{u.name}</div>
            ))}
        </div>
    );
};
