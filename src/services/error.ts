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

const retryAction_throwable = async (
    api: MiddlewareAPI,
    action: any,
    placeNumber: number
) => {
    console.log(`[${placeNumber}.1] RETRYING_FOR: `, action.meta.arg);

    const result = api.dispatch(action.meta.arg);

    console.log(`[${placeNumber}.2] DISPATCHED: `, action.meta.arg);

    return result; // Return the thunk promise
};

// ---------------------------------------------------------------------------------------------

const doExpiryLogic = async (api: MiddlewareAPI, action: any): Promise<any> => {
    let releaseHandle: MutexInterface.Releaser | null = null;

    console.log("[0] START_LOGIC_FOR: ", action.meta.arg);

    try {
        // Check if mutex is already locked (another refresh is in progress)
        if (!mutex.isLocked()) {
            console.log("[1] ACQUIRING_MUTEX_FOR: ", action.meta.arg);

            // Acquire the mutex lock
            releaseHandle = await mutex.acquire();

            // Attempt to refresh the token
            const newToken = await getNewTokens();
            if (!newToken) throw new Error("Token refresh failed");

            console.log("[2] RECEIVED_REFRESH_TOKEN_FOR: ", action.meta.arg);

            // Store the new token
            await setTokens_safe(newToken);

            releaseHandle?.();

            // Retry the original request
            return await retryAction_throwable(api, action, 3);
        } else {
            console.log("[-1] WAITING_MUTEX_FOR: ", action.meta.arg);

            // Mutex is locked, wait for it to be released
            await mutex.waitForUnlock();

            return await retryAction_throwable(api, action, -3);
        }
    } catch (ex) {
        releaseHandle?.();

        console.log("CAUGHT: ", ex);

        // Handle refresh error
        removeAccessToken();
        globalThis.location.replace("/login");
        errorToast("_END_OF_SESSION_");

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
