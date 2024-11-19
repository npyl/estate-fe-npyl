interface GoogleWorkspaceKeys {
    clientId: string;
    clientSecret: string;
    domain: string;
}

const baseUrl = `${process.env.BACKEND_API_URL}/company/socials/google-workspace`;

/**
 * getCredentialsForUser
 * @param Authorization `Bearer ${...}`
 * @returns Receive google workspace credentials from backend
 */
export const getCredentialsForUser = async (
    Authorization: string
): Promise<GoogleWorkspaceKeys | null> => {
    const headers = {
        Authorization,
    } as HeadersInit;

    const res = await fetch(baseUrl, {
        headers,
    });

    if (!res.ok) return null;

    try {
        // INFO: this returns null when we have not setup credentials (=> use try to avoid unexpected end of JSON)
        return await res.json();
    } catch (ex) {
        return null;
    }
};

export default getCredentialsForUser;
