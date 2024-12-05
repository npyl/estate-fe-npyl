import { useGetPropertyByIdQuery } from "@/services/properties";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { IKanbanCard } from "@/types/tasks";

const useTaskFromProperty = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { t, i18n } = useTranslation();
    const { data: property } = useGetPropertyByIdQuery(+propertyId!);

    const getTask = useCallback(() => {
        const NAME = t("Task for property");
        const TITLE = property?.descriptions?.[i18n.language]?.title || "";

        const name = `${NAME} (${TITLE})`;

        const propertyMini = {
            id: property?.id,
            code: property?.code,
            image: "",
        };

        const hasOwner = Boolean(property?.owner?.id);

        const customerMini = {
            id: property?.owner?.id,
            firstName: property?.owner?.firstName || "",
            lastName: property?.owner?.lastName || "",
        };

        return {
            name,
            properties: [propertyMini],
            customers: hasOwner ? [customerMini] : [],
        } as IKanbanCard;
    }, [t, i18n.language, property?.id]);

    return { getTask };
};

export default useTaskFromProperty;
