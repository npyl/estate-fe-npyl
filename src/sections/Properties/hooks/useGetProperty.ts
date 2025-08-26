import { useRouter } from "next/router";
import { useGetPropertyByIdQuery } from "@/services/properties";

const useGetProperty = () => {
    const { propertyId } = useRouter().query;
    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    return { property, propertyId: +propertyId! };
};

export default useGetProperty;
