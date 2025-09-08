// Mock document.cookie for Jest environment

const initialiseCookie = (cookieName: string = "cookie", v: string = "") => {
    // Format the cookie properly as "name=value"
    const value = `${encodeURIComponent(cookieName)}=${encodeURIComponent(v)}`;

    Object.defineProperty(document, "cookie", {
        writable: true,
        configurable: true,
        value,
    });
};

const clearCookies = () => {
    Object.defineProperty(document, "cookie", {
        writable: true,
        configurable: true,
        value: "",
    });
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

export { initialiseCookie, parseCookies, clearCookies };
