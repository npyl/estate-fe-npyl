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

        // --- NEW IMPLEMENTATION ---

        // 1. Create a Promise that we can resolve from our exposed function
        let authResolver: (value: boolean) => void;
        const authPromise = new Promise<boolean>((resolve) => {
            authResolver = resolve;
        });

        // 2. Expose a function on the main page. The popup will call this function.
        await page.exposeFunction("onGoogleAuthSuccess", () => {
            console.log("onGoogleAuthSuccess called from browser");
            authResolver(true);
        });

        // Create a new page for OAuth popup
        const context = page.context();
        const oauthPage = await context.newPage();

        // Navigate to OAuth URL in the popup page
        await oauthPage.goto(data.authUrl);

        // --------------------------------------------------
        // Handle Google OAuth flow (e.g., filling in email, password, consenting)
        // ... your Google interaction logic would go here ...
        // --------------------------------------------------

        // Final wait for the redirect to our app to complete
        await oauthPage.waitForURL(/localhost|127\.0\.0\.1/, {
            timeout: 3 * 60 * 1000,
        });

        console.log("Successfully redirected back to the app.");

        // 3. Instead of postMessage, call the function we exposed on the opener
        await oauthPage.evaluate(() => {
            if (
                window.opener &&
                typeof (window.opener as any).onGoogleAuthSuccess === "function"
            ) {
                (window.opener as any).onGoogleAuthSuccess();
            } else {
                // Fallback for debugging, but the `exposeFunction` should make this reliable
                console.error(
                    "Could not find onGoogleAuthSuccess on window.opener"
                );
            }
        });

        // 4. Wait for the promise to be resolved by the exposed function
        await authPromise;

        // Close the OAuth page
        await oauthPage.close();

        console.log("Google OAuth authentication completed");
    } catch (error) {
        console.error("Google OAuth setup failed:", error);
        throw error;
    }
};

export default prepareGoogleOAuth;
