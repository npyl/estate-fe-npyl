import { IView } from "@/types/publicDashboard";
import { IProperties } from "@/types/properties";
import { apiWithTranslation, createLanguageAwareHook as la } from "./_util";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

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

export const publicDashboard = apiWithTranslation({
    reducerPath: "publicDashboard",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/public-dashboard`,
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
    useGetPublicDashboardPropertyViewsQuery,
} = publicDashboard;

const useGetPublicDashboardPopularPropertiesQuery = la(
    publicDashboard.useGetPublicDashboardPopularPropertiesQuery
);

export { useGetPublicDashboardPopularPropertiesQuery };
