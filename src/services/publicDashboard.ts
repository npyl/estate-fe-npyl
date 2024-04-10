import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPublicDashboard, IView } from "@/types/publicDashboard";

type TTimeFrame = "ALL_TIME" | "CUSTOM" | "DAY" | "MONTH" | "WEEK" | "YEAR";

interface ParentCategoriesParams {
    startDate: string;
    endDate: string;
    timeFrame: TTimeFrame;
}

interface PopularPropertiesParams {
    parentCategory: string;
    category: string;
    timeFrame: TTimeFrame;
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
            IView[],
            PopularPropertiesParams
        >({
            query: (params) => ({ url: "/popular-properties", params }),
        }),

        getPublicDashboardPropertyViews: builder.query<
            IView[],
            PopularPropertiesParams
        >({
            query: (params) => ({ url: "/property-views", params }),
        }),
    }),
});

export const {
    useGetPublicDashboardQuery,
    useGetPublicDashboardParentCategoriesQuery,
    useGetPublicDashboardPopularPropertiesQuery,
    useGetPublicDashboardPropertyViewsQuery,
} = publicDashboard;
