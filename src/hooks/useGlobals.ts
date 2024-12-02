import { useAllGlobalsQuery } from "src/services/global";

export const useGlobals = () => {
    const { data: result } = useAllGlobalsQuery();
    return result;
};
