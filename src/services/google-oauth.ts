import useDialog from "@/hooks/useDialog";
import { IsAuthenticatedRes } from "@/types/calendar/google";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { calendar } from "./calendar";
import { errorToast } from "@/components/Toaster";
import { getAccessToken } from "@/contexts/tokens";

type UserId = number;

const baseUrl = `${process.env.NEXT_PUBLIC_PROXY_API}/google`;

export const googleOAuth = createApi({
    reducerPath: "googleOAuth",
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),

    tagTypes: ["IsAuthenticated"],

    endpoints: (builder) => ({
        isAuthenticated: builder.query<IsAuthenticatedRes, UserId>({
            query: (userId) => ({
                url: `/${userId}/auth`,
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            }),
            providesTags: ["IsAuthenticated"],
        }),
    }),
});

// ------------------------------------------------------------

const useAuthenticateMutation = () => {
    const dispatch = useDispatch();

    const [isLoading, startLoading, stopLoading] = useDialog();

    const cb = useCallback(async (userId: UserId) => {
        startLoading();

        try {
            const res = await fetch(`${baseUrl}/${userId}/auth`, {
                method: "POST",
            });

            if (!res.ok) throw await res.json();

            const data = (await res.json()) as { authUrl: string };

            const width = 600;
            const height = 600;
            const left = (window.innerWidth - width) / 2 + window.screenX;
            const top = (window.innerHeight - height) / 2 + window.screenY;

            // Open popup with google's oauth
            window.open(
                data.authUrl,
                "Google Auth",
                `width=${width},height=${height},left=${left},top=${top},popup=1`
            );

            // Wait for popup to post a message to our initial window
            await new Promise<boolean>((resolve, reject) => {
                window.onmessage = (event: MessageEvent) => {
                    if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
                        window.onmessage = null;
                        resolve(true);
                    }
                    if (event.data.type === "GOOGLE_AUTH_ERROR") {
                        window.onmessage = null;
                        reject(new Error("Authentication failed"));
                    }
                };
            });

            dispatch(googleOAuth.util.invalidateTags(["IsAuthenticated"]));
            dispatch(
                calendar.util.invalidateTags(["IsAdmin", "Events", "Users"])
            );
        } catch (ex) {
            errorToast("GOOGLE_OATH_FAIL");
        }

        stopLoading();
    }, []);

    return [cb, { isLoading }] as const;
};

const useLogoutMutation = () => {
    const dispatch = useDispatch();

    const cb = useCallback(async (userId: UserId) => {
        try {
            const res = await fetch(`${baseUrl}/${userId}/auth`, {
                method: "DELETE",
            });

            if (!res.ok) throw await res.json();

            dispatch(googleOAuth.util.invalidateTags(["IsAuthenticated"]));
        } catch (ex) {
            console.error(ex);
            errorToast("_ERROR_");
        }
    }, []);

    return [cb] as const;
};

export { useAuthenticateMutation, useLogoutMutation };
export const { useIsAuthenticatedQuery } = googleOAuth;
