import { useGlobals } from "@/hooks/useGlobals";
import { useMemo } from "react";

const useEnums = () => {
    const enums = useGlobals();

    const details = useMemo(() => enums?.property?.details, [enums]);

    return {
        frameTypeEnum: details?.frameType || [],
        furnishedEnum: details?.furnished || [],
        heatingTypeEnum: details?.heatingType || [],
        minFloorEnum: details?.floors || [],
        maxFloorEnum: details?.floors || [],
    };
};

export default useEnums;
