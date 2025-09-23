import { useRef } from "react";
import useUpdateLayoutEffect from "@/hooks/useUpdateLayoutEffect";
import getDiffedIds from "@/utils/getDiffedIds";

const useOnAddEffect = (ids: number[], cb: (id: number) => void) => {
    const oldIds = useRef(ids);
    useUpdateLayoutEffect(() => {
        const newIds = getDiffedIds(oldIds.current, ids);
        if (newIds.length === 0) return;

        const id = newIds.at(0) ?? -1;
        if (id === -1) return;

        cb(id);

        oldIds.current = ids;
    }, [ids]);
};

export default useOnAddEffect;
