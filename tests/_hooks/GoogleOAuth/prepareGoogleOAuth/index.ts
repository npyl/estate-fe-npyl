import { Page } from "@playwright/test";

const localhost = "http://127.0.0.1:3000";
const baseUrl = `${localhost}/api/google`;

const prepareGoogleOAuth = async (page: Page, userId: number) => {
    try {
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

        // Race between URL navigation and popup closure
        try {
            await popup.waitForEvent("close", { timeout: 2 * 60 * 1000 });
        } catch (error) {
            // Check if popup is already closed
            if (popup.isClosed()) {
                console.log(
                    "Popup was closed during OAuth flow - likely successful"
                );
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error("Google OAuth setup failed:", error);
        throw error;
    }
};

export default prepareGoogleOAuth;
