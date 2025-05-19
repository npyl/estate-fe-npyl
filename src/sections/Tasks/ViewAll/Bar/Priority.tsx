import { useCallback } from "react";
import { useFiltersContext } from "@/sections/Tasks/filters";
import PriorityGroup from "@/sections/Tasks/PriorityGroup";

const Priority = () => {
    const { filters, setPriority } = useFiltersContext();
    const { priority } = filters || {};
    const handleChange = useCallback((_: any, p: number) => setPriority(p), []);
    const handleClear = useCallback(() => setPriority(undefined), []);
    return (
        <PriorityGroup
            value={priority}
            onChange={handleChange}
            onClear={handleClear}
        />
    );
};
export default Priority;
