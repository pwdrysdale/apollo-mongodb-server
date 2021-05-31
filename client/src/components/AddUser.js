import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { USER_ADD } from "../mutations/addUser";
import { GET_USERS } from "../queries/getUsers";

export const AddUser = () => {
    const [username, setUsername] = useState("");
    const [addUser, { data }] = useMutation(USER_ADD);

    const onSubmit = async (e) => {
        e.preventDefault();
        await addUser({
            variables: { name: username },
            refetchQueries: [{ query: GET_USERS }],
        });
        setUsername("");
    };

    return (
        <div>
            Add user component{" "}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Submit</button>
                {data && data.user.name + " added!"}
            </form>
        </div>
    );
};
