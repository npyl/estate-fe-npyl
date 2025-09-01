import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";
import isFalsy from "@/utils/isFalsy";

const PropertyEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: isFalsy(resourceId),
    });
    const { code, createdAt, updatedAt } = data || {};

    const isFirstEdit = createdAt?.toString() === updatedAt?.toString();

    if (isFirstEdit) return "";

    return code || "";
};

export default PropertyEdit;
