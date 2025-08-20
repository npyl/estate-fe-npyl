import { UserResponse } from "../../../src/types/auth";
import { TCredentials } from "../../_util/getCredentials";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const loginUrl = `${baseUrl}/login`;

const login = async (credentials: TCredentials) => {
    const res = await fetch(loginUrl, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(credentials),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as UserResponse;
    if (!("token" in data)) return false;

    return data.token;
};

export default login;
