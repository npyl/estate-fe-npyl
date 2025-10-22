import { errorToast } from "@/components/Toaster";
import { removeAccessToken, setTokens } from "@/contexts/tokens";
import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import getNewTokens from "@/services/auth/getNewTokens";

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
    // If we're already refreshing, queue this request
    if (isRefreshing) {
        return new Promise<{ token: string | null; action: any }>(
            (resolve, reject) => {
                console.log("Adding to queue action: ", action);
                failedQueue.push({ resolve, reject, action });
            }
        )
            .then((result) => {
                console.log("Resolving action: ", result.action);

                // The token has been refreshed, now retry the original request
                // For RTK Query, we need to dispatch the original thunk again
                if (result.action?.meta?.arg)
                    return api.dispatch(result.action.meta.arg);

                return null;
            })
            .catch((error) => {
                console.log("Error0....");

                // If refresh failed, redirect to login
                removeAccessToken();
                globalThis.window.location.replace("/authentication/login");
                errorToast("_END_OF_SESSION_");
                throw error;
            });
    }

    // Set refreshing flag
    isRefreshing = true;

    try {
        // Attempt to refresh the token
        const newToken = await getNewTokens();
        if (!newToken) throw new Error("Token refresh failed");

        // Store the new token
        setTokens(newToken);

        // Token refresh successful
        processQueue(null, newToken.token);
        isRefreshing = false;

        // Retry the original request
        // For RTK Query, we need to dispatch the original query/mutation again
        if (action.meta?.arg) return api.dispatch(action.meta.arg);

        return null;
    } catch (error) {
        // Handle refresh error
        processQueue(error, null);
        isRefreshing = false;

        removeAccessToken();
        globalThis.location.replace("/authentication/login");
        errorToast("_END_OF_SESSION_");
        throw error;
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
