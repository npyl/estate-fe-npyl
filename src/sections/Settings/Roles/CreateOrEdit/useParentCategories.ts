import { useGlobals } from "@/sections/useGlobals";
import { useMemo } from "react";

/**
 * Returns only the keys
 */
const useParentCategories = (skip?: boolean) => {
    const data = useGlobals(skip);

    // INFO: parent category keys
    const keys = useMemo(
        () => data?.property?.parentCategory?.map(({ key }) => key) || [],
        [data?.property?.parentCategory]
    );

    return keys;
};

export default useParentCategories;
