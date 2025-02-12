import { useMemo } from "react";
import { useGlobals } from "src/hooks/useGlobals";

const useDemandEnums = () => {
    const enums = useGlobals();

    const { propertyEnums, timeframeEnum } = useMemo(
        () => ({
            propertyEnums: enums?.property,
            timeframeEnum: enums?.customer?.timeframe || [],
        }),
        [enums]
    );
    const { stateEnum, detailsEnum, parentCategoryEnum } = useMemo(
        () => ({
            stateEnum: propertyEnums?.state || [],
            detailsEnum: propertyEnums?.details,
            parentCategoryEnum: propertyEnums?.parentCategory || [],
        }),
        [propertyEnums]
    );
    const {
        furnishingEnum,
        minFloors,
        maxFloors,
        minFloorsKeys,
        maxFloorsKeys,
    } = useMemo(
        () => ({
            furnishingEnum: detailsEnum?.furnished || [],
            minFloors: detailsEnum?.floors || [],
            maxFloors: detailsEnum?.floors || [],
            minFloorsKeys: detailsEnum?.floors?.map((i) => i.key) || [],
            maxFloorsKeys: detailsEnum?.floors?.map((i) => i.key) || [],
        }),
        [detailsEnum]
    );

    return {
        propertyEnums,
        timeframeEnum,
        stateEnum,
        detailsEnum,
        parentCategoryEnum,
        furnishingEnum,
        minFloors,
        maxFloors,
        minFloorsKeys,
        maxFloorsKeys,
    };
};

export default useDemandEnums;
