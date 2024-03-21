import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            if (
                action.payload.status === 401 ||
                action.payload.status === 403
            ) {
                localStorage.removeItem("accessToken");
                window.location.replace("/authentication/login");
            }
            toast.error(
                action.payload?.data?.error?.detail ||
                    action.payload?.data?.error ||
                    "Something went wrong"
            );
        }

        return next(action);
    };
