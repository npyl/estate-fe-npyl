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

export { createLanguageAwareHook };
