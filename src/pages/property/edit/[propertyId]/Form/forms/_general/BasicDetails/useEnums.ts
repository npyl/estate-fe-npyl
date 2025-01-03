import { useGlobals } from "@/hooks/useGlobals";
import { IGlobalProperty } from "@/types/global";
import { useMemo } from "react";

const useEnums = () => {
    const data = useGlobals();

    const enums = useMemo(
        () => ({
            propertyEnums: data?.property as IGlobalProperty,
            stateEnum: data?.property?.state || [],
        }),
        [data]
    );

    return enums;
};

export default useEnums;
