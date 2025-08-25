import { UserResponse } from "../../../../src/types/auth";
import { TCredentials } from "../../../_util/getCredentials";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const loginUrl = `${baseUrl}/login`;

const login = async (credentials: TCredentials) => {
    try {
        const res = await fetch(loginUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(credentials),
        });
        if (!res.ok) throw await res.json();

        const data = (await res.json()) as UserResponse;
        if (!("token" in data)) throw "Bad content in login response";

        return data.token ?? "";
    } catch (ex) {
        return "";
    }
};

export default login;
