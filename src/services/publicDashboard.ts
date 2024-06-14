import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IView } from "@/types/publicDashboard";
import { IProperties } from "@/types/properties";

type TTimeFrame = "ALL_TIME" | "CUSTOM" | "DAY" | "MONTH" | "WEEK" | "YEAR";

interface ParentCategoriesParams {
    startDate?: string;
    endDate?: string;
    timeframe: TTimeFrame;
}

interface PopularPropertiesParams {
    parentCategory: string;
    category: string;
    timeframe: TTimeFrame;
    startDate?: string;
    endDate?: string;
}

interface TotalPropertyViews {
    totalViews: number;
    views: {
        hour: number;
        views: number;
    }[];
}

export const publicDashboard = createApi({
    reducerPath: "publicDashboard",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/public-dashboard`,
        prepareHeaders: (headers) => {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );
            headers.set("Time-Zone", timeZone);

            return headers;
        },
    }),

    endpoints: (builder) => ({
        getDailyViews: builder.query<TotalPropertyViews, void>({
            query: () => ({ url: "/daily-views" }),
        }),

        getPublicDashboardParentCategories: builder.query<
            IView[],
            ParentCategoriesParams
        >({
            query: (params) => ({ url: "/parent-categories", params }),
        }),

        getPublicDashboardPopularProperties: builder.query<
            IProperties[],
            PopularPropertiesParams
        >({
            query: (params) => ({ url: "/popular-properties", params }),
        }),

        getPublicDashboardPropertyViews: builder.query<
            IView<"All" | "parentCategory" | "category">[],
            PopularPropertiesParams
        >({
            query: (params) => ({ url: "/property-views", params }),
        }),
    }),
});

export const {
    useGetDailyViewsQuery,
    useGetPublicDashboardParentCategoriesQuery,
    useGetPublicDashboardPopularPropertiesQuery,
    useGetPublicDashboardPropertyViewsQuery,
} = publicDashboard;
