import { errorToast } from "@/components/Toaster";
import { removeAccessToken, setTokens } from "@/contexts/tokens";
import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import getNewTokens from "@/services/auth/getNewTokens";

// ---------------------------------------------------------------------------------------------

const LOG_CODES = {
    REFRESHING: "IS_REFRESHING",
    // ...
    MAIN_LOGIC: "MAIN_LOGIC",
    // ...
    ADD_TO_QUEUE: "ADD_TO_QUEUE",
    RESOVLING: "RESOLVING",
    ERROR: "ERROR",
};

const isDebug = process.env.NODE_ENV === "development";

const log = (s: keyof typeof LOG_CODES, ...args: any) => {
    if (!isDebug) return;
    console.log(LOG_CODES[s], ...args);
};

// ---------------------------------------------------------------------------------------------

interface QueuedRequest {
    resolve: (value: { token: string | null; action: any }) => void;
    reject: (reason?: any) => void;
    action: any;
}

let isRefreshing = false; // INFO: prevent simultaneous requests
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    for (const { resolve, reject, action } of failedQueue) {
        if (error) {
            reject(error);
        } else {
            resolve({ token, action });
        }
    }

    failedQueue = [];
};

// ---------------------------------------------------------------------------------------------

const doExpiryLogic = async (api: MiddlewareAPI, action: any): Promise<any> => {
    try {
        // If we're already refreshing, queue this request
        if (isRefreshing) {
            log("REFRESHING");

            return new Promise<{ token: string | null; action: any }>(
                (resolve, reject) => {
                    log("ADD_TO_QUEUE", action);
                    failedQueue.push({ resolve, reject, action });
                }
            ).then((result) => {
                log("RESOVLING", result.action);

                // The token has been refreshed, now retry the original request
                // For RTK Query, we need to dispatch the original thunk again
                if (result.action?.meta?.arg)
                    return api.dispatch(result.action.meta.arg);

                return null;
            });
        }

        // Set refreshing flag
        isRefreshing = true;

        log("MAIN_LOGIC");

        // Attempt to refresh the token
        const newToken = await getNewTokens();
        if (!newToken) throw new Error("Token refresh failed");

        // Store the new token
        setTokens(newToken);

        // Token refresh successful
        processQueue(null, newToken.token);

        // Retry the original request
        // For RTK Query, we need to dispatch the original query/mutation again
        if (action.meta?.arg) return api.dispatch(action.meta.arg);

        return null;
    } catch (error) {
        log("ERROR", error);

        // Handle refresh error
        processQueue(error, null);

        removeAccessToken();
        globalThis.location.replace("/login");
        errorToast("_END_OF_SESSION_");
        throw error;
    } finally {
        // Always reset the flag, even if an error occurs
        isRefreshing = false;
    }
};

/**
 * Handle error & token refresh (w/ request retry)
 */
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => async (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood
        if (isRejectedWithValue(action)) {
            const status = action.payload?.status;

            const isTokenExpired = status === 401 || status === 403;
            if (!isTokenExpired) return next(action);

            return await doExpiryLogic(api, action);
        }

        return next(action);
    };
