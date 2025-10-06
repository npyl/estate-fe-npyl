import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ILabels } from "@/types/label";
import getSection, { TSection } from "./getSection";
import { TranslationType } from "@/types/translation";

const getSections = (t: TranslationType): Record<keyof ILabels, TSection> => ({
    propertyLabels: {
        label: t("Property"),
        variant: "property",
    },
    customerLabels: {
        label: t("Customer"),
        variant: "customer",
    },
    documentLabels: {
        label: t("Document"),
        variant: "document",
    },
    ticketLabels: {
        label: t("Tasks"),
        variant: "ticket",
    },
});

const Preview = () => {
    const { t } = useTranslation();

    const sections = useMemo(() => {
        // INFO: Type assertion
        return Object.entries(getSections(t)) as [keyof ILabels, TSection][];
    }, [t]);

    return sections.map(getSection);
};

export default Preview;
