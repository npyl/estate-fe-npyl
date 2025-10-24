import { errorToast } from "@/components/Toaster";
import { removeAccessToken, setTokens } from "@/contexts/tokens";
import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import getNewTokens from "@/services/auth/getNewTokens";
import { Mutex } from "async-mutex";

// ---------------------------------------------------------------------------------------------

// Create a new mutex to protect token refresh operations
const mutex = new Mutex();

// ---------------------------------------------------------------------------------------------

const doExpiryLogic = async (api: MiddlewareAPI, action: any): Promise<any> => {
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    // Check if mutex is already locked (another refresh is in progress)
    if (!mutex.isLocked()) {
        // Acquire the mutex lock
        const release = await mutex.acquire();

        try {
            // Attempt to refresh the token
            const newToken = await getNewTokens();
            if (!newToken) throw new Error("Token refresh failed");

            // Store the new token
            setTokens(newToken);

            // Retry the original request
            // For RTK Query, we need to dispatch the original query/mutation again
            if (action.meta?.arg) {
                return api.dispatch(action.meta.arg);
            }

            return null;
        } catch (error) {
            // Handle refresh error
            removeAccessToken();
            globalThis.location.replace("/login");
            errorToast("_END_OF_SESSION_");
            throw error;
        } finally {
            // Always release the mutex, even if an error occurs
            release();
        }
    } else {
        // Mutex is locked, wait for it to be released
        await mutex.waitForUnlock();

        // Token has been refreshed by another request, retry this one
        if (action.meta?.arg) {
            return api.dispatch(action.meta.arg);
        }

        return null;
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
