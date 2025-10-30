import { useAllGlobalsQuery } from "src/services/global";

export const useGlobals = (skip?: boolean) => {
    const { data: result } = useAllGlobalsQuery(undefined, { skip });
    return result;
};
