import { useRouter } from "next/router";
import { useGetPropertyByIdQuery } from "src/services/properties";

export const useGetProperty = () => {
    const { propertyId } = useRouter().query;
    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    return { property };
};
