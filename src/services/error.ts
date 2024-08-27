import {
    Middleware,
    MiddlewareAPI,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
                localStorage.removeItem("accessToken");
                window.location.replace("/authentication/login");
                toast.error("End of session (Λήξη συνεδρίας)");
            } else {
                toast.error("Error (Σφάλμα)");
            }
        }

        return next(action);
    };
