import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
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
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
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
                    if (!newToken) throw new Error("Failed to refresh tokens");

                    await setTokens_safe(newToken);

                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions);

                    const status = result.meta?.response?.status;
                    if (status === 401 || status === 403)
                        throw new Error(
                            "Did not actually succeed with refresh!"
                        );

                    // INFO: release !ONLY! if unauthorized does not re-occur!
                    release();
                } catch (err) {
                    console.log("GOT ERROR: ", err);
                    removeAccessToken();
                    globalThis.location.replace("/login");
                }
            } else {
                // Wait for the refresh to complete
                await mutex.waitForUnlock();
                result = await baseQuery(args, api, extraOptions);

                const status = result.meta?.response?.status;
                if (status === 401 || status === 403) {
                    removeAccessToken();
                    globalThis.location.replace("/login");
                }
            }
        }

        return result;
    };

    return baseQueryWithReauth;
};

export default getBaseQueryWithReauth;
