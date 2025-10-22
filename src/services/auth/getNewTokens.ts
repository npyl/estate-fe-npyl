import { getTokens } from "@/contexts/tokens";
import { TokenResponse } from "@/types/auth";

const revalidateUrl = `${process.env.NEXT_PUBLIC_API_URL}/refresh`;

const getNewTokens = async () => {
    try {
        const { accessToken, refreshToken } = getTokens();
        if (!accessToken) throw new Error("No access token available");
        if (!refreshToken) throw new Error("No refresh token available");

        const res = await fetch(revalidateUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
        });
        if (!res.ok) throw new Error("Token refresh failed");

        const data = (await res.json()) as TokenResponse;
        if (!data?.token || !data?.refreshToken)
            throw new Error("No access token received!");

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getNewTokens;
