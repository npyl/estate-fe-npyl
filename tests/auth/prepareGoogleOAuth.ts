import { Page } from "@playwright/test";

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

const prepareGoogleOAuth = async (
    page: Page,
    accessToken: string,
    userId: number
) => {
    try {
        const isAuthenticated = await isOAuthAuthenticated(accessToken, userId);
        if (isAuthenticated) {
            console.log("GoogleOAuth: already authenticated");
            return;
        }

        // Start OAuth flow
        const authResponse = await fetch(`${baseUrl}/${userId}/auth`, {
            method: "POST",
        });
        if (!authResponse.ok)
            throw `Auth request failed: ${authResponse.status}`;

        const data = (await authResponse.json()) as { authUrl: string };

        // Wait for popup to be opened
        const [popup] = await Promise.all([
            page.waitForEvent("popup"),
            page.evaluate((authUrl) => {
                const width = 600;
                const height = 600;
                const left = (window.innerWidth - width) / 2 + window.screenX;
                const top = (window.innerHeight - height) / 2 + window.screenY;

                window.open(
                    authUrl,
                    "Google Auth",
                    `width=${width},height=${height},left=${left},top=${top},popup=1`
                );
            }, data.authUrl),
        ]);

        // Wait for the popup to navigate to your callback URL
        // This indicates successful authentication
        await popup.waitForURL(/oauth\?state=.*&code=.*/, {
            timeout: 60000, // 60 second timeout
        });

        // The popup should automatically close due to your API route
        // but we can wait for it to close to be sure
        await popup.waitForEvent("close", { timeout: 10000 });

        console.log("Google OAuth authentication completed");
    } catch (error) {
        console.error("Google OAuth setup failed:", error);
        throw error;
    }
};

export default prepareGoogleOAuth;
