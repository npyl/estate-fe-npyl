import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";

const PropertyEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { code, createdAt, updatedAt } = data || {};

    const isFirstEdit = createdAt?.toString() === updatedAt?.toString();

    if (isFirstEdit) return "";

    return code || "";
};

export default PropertyEdit;
