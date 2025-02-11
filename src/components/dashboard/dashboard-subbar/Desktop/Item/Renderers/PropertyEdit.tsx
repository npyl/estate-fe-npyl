import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";

const PropertyEdit: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    const { code } = data || {};
    return code || "";
};

export default PropertyEdit;
