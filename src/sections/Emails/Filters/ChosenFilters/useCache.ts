import { useAllPropertyCodesQuery } from "@/services/properties";
import { useMemo } from "react";

type TCodeMap = Map<number, string>;
type UseCache = () => { CODES: TCodeMap };

const useCache: UseCache = () => {
    const { data } = useAllPropertyCodesQuery();
    const CODES = useMemo(() => {
        const map = new Map<number, string>();
        data?.forEach(({ id, code }) => map.set(id, code));
        return map;
    }, [data]);

    return { CODES };
};

export type { TCodeMap };
export default useCache;
