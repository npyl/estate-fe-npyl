import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { ITabRendererProps } from "../types";
import isFalsy from "@/utils/isFalsy";

const PropertyView: FC<ITabRendererProps> = ({ resourceId }) => {
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: isFalsy(resourceId),
    });
    return data?.code || "";
};

export default PropertyView;
