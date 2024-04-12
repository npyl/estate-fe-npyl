import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPublicDashboard, IView } from "@/types/publicDashboard";
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
            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );
            headers.set(
                "Accept-Language",
                `${localStorage.getItem("language") ?? "el"}`
            );
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getDailyViews: builder.query<TotalPropertyViews, void>({
            query: () => ({ url: "/daily-views" }),
        }),

        getPublicDashboard: builder.query<IPublicDashboard, void>({
            query: () => "",
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
    useGetPublicDashboardQuery,
    useGetPublicDashboardParentCategoriesQuery,
    useGetPublicDashboardPopularPropertiesQuery,
    useGetPublicDashboardPropertyViewsQuery,
} = publicDashboard;
