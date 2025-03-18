import { useTabsContext } from "@/contexts/tabs";
import { useCallback } from "react";
import {
    MutationDefinition,
    BaseQueryFn,
    FetchBaseQueryError,
    FetchArgs,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { UseMutation } from "@reduxjs/toolkit/dist/query/react/buildHooks";

/**
 * Interface for tab-aware property deletion
 */
interface TabAwareProps<T> {
    tabPaths: string[];
    props: T;
}

/**
 * Creates a wrapper around RTK Query mutation hooks that automatically removes tabs after execution
 *
 * @param mutationHook The original RTK Query mutation hook to wrap
 * @returns A tab-aware version of the hook that will automatically remove tabs
 */
function createRemoveTabAwareHook<T>(
    mutationHook: UseMutation<
        MutationDefinition<
            T,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                {},
                FetchBaseQueryMeta
            >,
            any,
            any,
            any
        >
    >
) {
    return function () {
        const { removeTabs } = useTabsContext();
        const [originalMutation, originalResult] = mutationHook();

        const tabAwareMutation = useCallback(
            async ({ tabPaths, props }: TabAwareProps<T>) => {
                const result = await originalMutation(props);

                if (!("error" in result)) {
                    removeTabs(tabPaths);
                }

                return result;
            },
            [originalMutation, removeTabs]
        );

        return [tabAwareMutation, originalResult] as const;
    };
}

export { createRemoveTabAwareHook };
