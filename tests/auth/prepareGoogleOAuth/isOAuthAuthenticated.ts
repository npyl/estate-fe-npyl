const localhost = "http://127.0.0.1:3000";

const baseUrl = `${localhost}/api/google`;

const isOAuthAuthenticated = async (accessToken: string, userId: number) => {
    try {
        const res = await fetch(`${baseUrl}/${userId}/auth`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            console.log(`Auth check failed with status: ${res.status}`);
            return false;
        }

        const authData = await res.json();

        return authData.isAuthenticated;
    } catch (error) {
        console.error("Error checking OAuth authentication:", error);
        return false;
    }
};

export default isOAuthAuthenticated;
