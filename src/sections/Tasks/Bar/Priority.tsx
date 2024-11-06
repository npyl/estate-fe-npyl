import { useCallback } from "react";
import { useFiltersContext } from "../filters";
import PriorityGroup from "../PriorityGroup";

const Priority = () => {
    const { priority, setPriority } = useFiltersContext();
    const handleChange = useCallback((_: any, p: number) => setPriority(p), []);
    return <PriorityGroup value={priority} onChange={handleChange} />;
};
export default Priority;
