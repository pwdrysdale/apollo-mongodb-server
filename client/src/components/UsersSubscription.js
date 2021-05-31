import React from "react";
import { useSubscription } from "@apollo/client";

import { NEW_USER_SUBSCRIPTION } from "../subscriptions/usersSubscription";

export const UsersSubscription = () => {
    const { data, loading } = useSubscription(NEW_USER_SUBSCRIPTION, {
        variables: {},
    });

    console.log(data);

    return (
        <div>
            <h1>User subscription component</h1>
            <div>{!loading && data && data.newUser.name}</div>
        </div>
    );
};
