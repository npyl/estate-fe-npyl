import { PING_URL } from "@/_private/useNetworkAccess";

// INFO: we do not care for the reset fields, this should help us with type-casting
type TExpectedResponse = Promise<Response>;

const OPAQUE = {
    ok: false, // opaque responses have ok: false
    status: 0, // opaque responses have status: 0
    type: "opaque",
};

const getMockFetch = (
    isOnlineRef: { current: boolean },
    originalFetch: typeof global.fetch
) =>
    jest.fn((url, options) => {
        // Check if this is the URL we want to intercept
        if (url === PING_URL) {
            if (isOnlineRef.current) {
                // Simulate successful opaque response (crucial for no-cors mode)
                return Promise.resolve({
                    statusText: "",
                    ...OPAQUE,
                    json: () => Promise.resolve({}),
                    text: () => Promise.resolve(""),
                    headers: new Headers(),
                }) as unknown as TExpectedResponse;
            } else {
                // Simulate network error
                return Promise.reject(
                    new Error("Network request failed")
                ) as unknown as TExpectedResponse;
            }
        }

        // For any other URLs, call the original fetch or return a default response
        if (originalFetch) {
            return originalFetch(url, options);
        }

        // Fallback for other requests
        return Promise.resolve({
            ok: true,
            status: 200,
            statusText: "OK",
            type: "basic",
            json: () => Promise.resolve({}),
            text: () => Promise.resolve(""),
            headers: new Headers(),
        }) as unknown as TExpectedResponse;
    });

export default getMockFetch;
