import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import getNewTokens from "@/services/auth/getNewTokens";
import {
    setTokens_safe,
    removeAccessToken,
    getAccessToken,
} from "@/contexts/tokens";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const mutex = new Mutex();

const getBaseQueryWithReauth = (args: FetchBaseQueryArgs) => {
    const baseQuery = fetchBaseQuery({
        ...args,
        prepareHeaders: (h, api) => {
            // INFO: apply any headers from parent
            if (args.prepareHeaders) args.prepareHeaders(h, api);

            // IMPORTANT: Apply token!
            h.set("Authorization", `Bearer ${getAccessToken()}`);

            return h;
        },
    });

    const baseQueryWithReauth: BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    > = async (args, api, extraOptions) => {
        // Wait until the mutex is available
        await mutex.waitForUnlock();

        let result = await baseQuery(args, api, extraOptions);

        if (
            result.error &&
            (result.error.status === 401 || result.error.status === 403)
        ) {
            // Check if we're not already refreshing
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();

                try {
                    const newToken = await getNewTokens();

                    if (newToken) {
                        await setTokens_safe(newToken);

                        // Retry the initial query
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        removeAccessToken();
                        globalThis.location.replace("/login");
                    }
                } finally {
                    release();
                }
            } else {
                // Wait for the refresh to complete
                await mutex.waitForUnlock();
                result = await baseQuery(args, api, extraOptions);
            }
        }

        return result;
    };

    return baseQueryWithReauth;
};

export default getBaseQueryWithReauth;
