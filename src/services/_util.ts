import { reactHooksModule } from "@reduxjs/toolkit/dist/query/react";
import { EndpointDefinitions } from "@reduxjs/toolkit/query";
import { buildCreateApi } from "@reduxjs/toolkit/query";
import { coreModule } from "@reduxjs/toolkit/query";
import { Module } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { ApiModules } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

function createLanguageAwareHook<T extends (...args: any[]) => any>(
    hook: T
): T {
    return ((...args: Parameters<T>) => {
        const { i18n } = useTranslation();

        // The first argument is our main data argument
        const firstArg = args[0];
        // Get all other arguments after the first one
        const restArgs = args.slice(1);

        // Create the wrapped args object with language
        const wrappedArgs = {
            language: i18n.language,
            org: firstArg,
        };

        // Call the hook with our wrapped first argument and spread the rest
        return hook(wrappedArgs, ...restArgs);
    }) as T;
}

type AcceptLanguageModule = keyof ApiModules<
    BaseQueryFn,
    EndpointDefinitions,
    string,
    string
>;

const acceptLanguageModule = (): Module<AcceptLanguageModule> => ({
    name: "acceptLanguage" as any,
    init: () => ({
        injectEndpoint: (_, definition) => {
            // INFO: for queryFn we do not have to do anything
            if (!definition.query) return;

            const originalQuery = definition.query;

            definition.query = (args) => {
                try {
                    const { language, org } = args || {};

                    // INFO: check for whether data is coming from `createLanguageAwareHook`.
                    //  If not, make sure we pass down the original args because not all endpoints are wrapped with this!
                    const wasWrapped = Boolean(language) && Boolean(org);

                    const res = originalQuery?.(wasWrapped ? org : args);

                    // INFO: some rtk apis use the quick notation: query: (id: number) => `${id}`
                    // Make sure we support that
                    let reworkedQuery =
                        typeof res === "string"
                            ? { url: res, method: "GET" }
                            : res;

                    // TOKEN
                    reworkedQuery = {
                        ...reworkedQuery,
                        headers: {
                            ...reworkedQuery.headers,
                            Authorization: `Bearer  ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                    };

                    // Language
                    if (language) {
                        reworkedQuery = {
                            ...reworkedQuery,
                            headers: {
                                ...reworkedQuery.headers,
                                "Accept-Language": language,
                            },
                        };
                    }

                    return reworkedQuery;
                } catch (ex) {
                    console.error(ex);
                }
            };
        },
    }),
});

const apiWithTranslation = buildCreateApi(
    coreModule(),
    reactHooksModule(),
    acceptLanguageModule()
);

export { apiWithTranslation, createLanguageAwareHook };
