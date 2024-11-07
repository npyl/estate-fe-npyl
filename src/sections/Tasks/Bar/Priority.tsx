import { useCallback } from "react";
import { useFiltersContext } from "../filters";
import PriorityGroup from "../PriorityGroup";

const Priority = () => {
    const { priority, setPriority } = useFiltersContext();
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
