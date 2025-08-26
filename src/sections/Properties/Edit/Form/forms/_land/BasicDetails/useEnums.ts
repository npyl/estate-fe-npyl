import { useGlobals } from "@/sections/useGlobals";
import { IGlobalProperty } from "@/types/global";

const useEnums = () => {
    const data = useGlobals();
    const enums = data?.property as IGlobalProperty;
    const stateEnum = enums?.state || [];
    return { enums, stateEnum };
};

export default useEnums;
