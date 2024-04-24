import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetPropertyByIdQuery } from "src/services/properties";

export const useGetDescription = () => {
    // TODO: maybe find a better way to do this...
    // NOTE: we do not rely on watch() because it causes problem with our flow (useEffect & Draft Editor)
    const router = useRouter();
    const { i18n } = useTranslation();
    const { propertyId } = router.query;

    const language = useMemo(
        () => (i18n.language === "gr" ? "el" : i18n.language),
        [i18n.language]
    );

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);

    return useMemo(() => {
        // null object
        if (!property?.descriptions) return { description: "", title: "" };
        // no elements
        if (Object.entries(property?.descriptions).length === 0)
            return { description: "", title: "" };

        const selected = property?.descriptions[language];

        return { description: selected.description, title: selected.title };
    }, [language, property?.descriptions]);
};
