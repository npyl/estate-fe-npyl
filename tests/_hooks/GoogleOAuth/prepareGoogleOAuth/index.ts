import { Page } from "@playwright/test";

const localhost = "http://127.0.0.1:3000";
const baseUrl = `${localhost}/api/google`;

const GOOGLE_TEST_EMAIL = "npylarinos@digipath.gr";
const GOOGLE_TEST_PASSWORD = "Pain@ass1";

const prepareGoogleOAuth = async (page: Page, userId: number) => {
    try {
        // Start OAuth flow
        const authResponse = await fetch(`${baseUrl}/${userId}/auth`, {
            method: "POST",
        });
        if (!authResponse.ok)
            throw `Auth request failed: ${authResponse.status}`;

        const data = (await authResponse.json()) as { authUrl: string };

        await automateOAuthFlow(page, data.authUrl, userId);
    } catch (error) {
        console.error("Google OAuth setup failed:", error);
        throw error;
    }
};

/**
 * Automates the OAuth flow using headless browser
 */
const automateOAuthFlow = async (
    page: Page,
    authUrl: string,
    userId: number
) => {
    console.log("Starting automated OAuth flow...");

    // Navigate to Google OAuth page
    await page.goto(authUrl);

    // Wait for and fill email
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.fill('input[type="email"]', GOOGLE_TEST_EMAIL);

    // Click Next button
    await page.click(
        '#identifierNext, [data-l10n-id="next"], button:has-text("Next")'
    );

    // Wait for password field and fill it
    await page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await page.fill('input[type="password"]', GOOGLE_TEST_PASSWORD);

    // Click Next/Sign in button
    await page.click(
        '#passwordNext, [data-l10n-id="signin"], button:has-text("Next"), button:has-text("Sign in")'
    );

    // Handle potential 2FA or security checks
    await handle2FAIfPresent(page);

    // Wait for consent screen and handle it
    await handleConsentScreen(page);

    // Wait for redirect back to your application
    await page.waitForURL(
        new RegExp(`${localhost}/api/google/${userId}/callback`),
        {
            timeout: 30000,
        }
    );

    console.log("OAuth flow completed successfully");
};

/**
 * Handles 2FA if present (you'll need to customize this based on your setup)
 */
const handle2FAIfPresent = async (page: Page) => {
    try {
        // Check if 2FA prompt appears
        const twoFactorSelector =
            'input[type="tel"], input[aria-label*="verification"], input[placeholder*="code"]';

        await page.waitForSelector(twoFactorSelector, { timeout: 5000 });

        console.log(
            "2FA detected. You'll need to handle this manually or implement SMS/authenticator automation"
        );

        // For manual intervention, you could pause here
        await page.pause(); // This will pause execution for manual 2FA entry

        // Or implement automated 2FA if you have access to codes
        // await handle2FAAutomatically(page);
    } catch (error) {
        // No 2FA required, continue
        console.log("No 2FA required");
    }
};

/**
 * Handles the OAuth consent screen
 */
const handleConsentScreen = async (page: Page) => {
    try {
        // Wait for consent screen
        await page.waitForSelector(
            'button:has-text("Allow"), button:has-text("Continue"), button[data-l10n-id="allow"]',
            { timeout: 10000 }
        );

        // Click Allow/Continue button
        await page.click(
            'button:has-text("Allow"), button:has-text("Continue"), button[data-l10n-id="allow"]'
        );

        console.log("Consent granted");
    } catch (error) {
        console.log("No consent screen or already consented");
    }
};

export default prepareGoogleOAuth;
