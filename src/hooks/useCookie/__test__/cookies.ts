import { getVersioned } from "@/hooks/useVersioned";
import { expect } from "@jest/globals";

// Mock document.cookie for Jest environment
Object.defineProperty(document, "cookie", {
    writable: true,
    value: "",
});

const clearCookies = () => {
    document.cookie = "";
};

/**
 * Helper function to parse document.cookie string into an object
 */
const parseCookies = (): Record<string, string> => {
    const cookies: Record<string, string> = {};
    if (document.cookie) {
        document.cookie.split(";").forEach((cookie) => {
            const [name, value] = cookie.trim().split("=");
            if (name && value) {
                cookies[decodeURIComponent(name)] = decodeURIComponent(value);
            }
        });
    }
    return cookies;
};

/**
 * Check actual cookie value (stored in document.cookie for Jest)
 * @param cookieName - The name of the cookie to check
 * @param content - Expected content value
 */
const expectCookie = (cookieName: string, expected: string | undefined) => {
    const cookies = parseCookies();

    if (expected === undefined) {
        expect(cookies[cookieName]).toBeUndefined();
        return;
    }

    const expectedJson = JSON.stringify(getVersioned(1, expected));
    const actualCookieValue = cookies[cookieName];

    expect(actualCookieValue).toBe(expectedJson);
};

export { expectCookie, clearCookies };
