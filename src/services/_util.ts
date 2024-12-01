import { reactHooksModule } from "@reduxjs/toolkit/dist/query/react";
import { EndpointDefinitions } from "@reduxjs/toolkit/query";
import { buildCreateApi } from "@reduxjs/toolkit/query";
import { coreModule } from "@reduxjs/toolkit/query";
import { Module } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { ApiModules } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

function createLanguageAwareHook<T extends (args: any) => any>(hook: T): T {
    return ((args: Parameters<T>[0]) => {
        const { i18n } = useTranslation();

        if (args && typeof args === "object") {
            args = {
                ...args,
                language: i18n.language,
            };
        }
        return hook(args);
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
            const originalQueryFn = definition.query;

            definition.query = (args) => {
                // Get the language from args if it exists
                const language = args?.language;

                let res = originalQueryFn?.(args);

                // TOKEN
                res = {
                    ...res,
                    headers: {
                        ...res.headers,
                        Authorization: `Bearer  ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                };

                // Language
                if (language) {
                    res = {
                        ...res,
                        headers: {
                            ...res.headers,
                            "Accept-Language": language,
                        },
                    };
                }

                return res;
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
