import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";

const PropertyView: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });
    return data?.code || "";
};

export default PropertyView;
