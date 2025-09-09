import { errorToast } from "@/components/Toaster";
import { removeAccessToken } from "@/contexts/accessToken";
import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            // Invalid token
            if (
                action.payload.status === 401 ||
                action.payload.status === 403
            ) {
                removeAccessToken();
                window.location.replace("/login");
                errorToast("_END_OF_SESSION_");
            } else {
                // no op
            }
        }

        return next(action);
    };
