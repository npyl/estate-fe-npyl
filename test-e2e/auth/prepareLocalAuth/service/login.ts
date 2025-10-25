import { TokenResponse } from "../../../../src/types/auth";
import { TCredential } from "../../../_util/getCredentials";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const loginUrl = `${baseUrl}/login`;

const login = async (credentials: TCredential) => {
    try {
        const res = await fetch(loginUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(credentials),
        });
        if (!res.ok) throw await res.json();

        const data = (await res.json()) as TokenResponse;
        if (!("token" in data))
            throw new Error("Bad content in login response");

        return data;
    } catch (ex) {
        console.log(ex);
        return "";
    }
};

export default login;
