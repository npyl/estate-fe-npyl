import { errorToast } from "@/components/Toaster";
import { removeAccessToken, setTokens_safe } from "@/contexts/tokens";
import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import getNewTokens from "@/services/auth/getNewTokens";
import { Mutex, MutexInterface } from "async-mutex";

// ---------------------------------------------------------------------------------------------

// Create a new mutex to protect token refresh operations
const mutex = new Mutex();

// ---------------------------------------------------------------------------------------------

const isUnauthorized = (result: any) => {
    const status = result?.action.payload?.status;
    return isRejectedWithValue(result) && (status === 401 || status === 403);
};

const retryAction_throwable = async (api: MiddlewareAPI, action: any) => {
    let result = null;
    try {
        result = await api.dispatch(action.meta.arg);
    } catch {}
    if (isUnauthorized(result)) throw new Error("Unauthorized after refresh!");
    return result;
};

// ---------------------------------------------------------------------------------------------

const doExpiryLogic = async (api: MiddlewareAPI, action: any): Promise<any> => {
    let releaseHandle: MutexInterface.Releaser | null = null;

    try {
        // Check if mutex is already locked (another refresh is in progress)
        if (!mutex.isLocked()) {
            // Acquire the mutex lock
            releaseHandle = await mutex.acquire();

            // Attempt to refresh the token
            const newToken = await getNewTokens();
            if (!newToken) throw new Error("Token refresh failed");

            // Store the new token
            await setTokens_safe(newToken);

            // Retry the original request
            const result = await retryAction_throwable(api, action);

            releaseHandle?.();

            return result;
        } else {
            // Mutex is locked, wait for it to be released
            await mutex.waitForUnlock();

            await retryAction_throwable(api, action);

            return null;
        }
    } catch {
        releaseHandle?.();

        // Handle refresh error
        removeAccessToken();
        globalThis.location.replace("/login");
        errorToast("_END_OF_SESSION_");
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
