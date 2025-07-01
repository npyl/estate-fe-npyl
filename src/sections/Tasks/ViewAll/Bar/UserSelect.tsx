import { useCallback } from "react";
import { useFiltersContext } from "@/sections/Tasks/filters";
import PPUserSelect from "@/ui/Pickers/UserSelect";

const UserSelect = () => {
    const { filters, setAssigneeId } = useFiltersContext();
    const { assigneeId } = filters || {};
    const onClear = useCallback(() => setAssigneeId(undefined), []);
    return (
        <PPUserSelect
            userId={assigneeId}
            onChange={setAssigneeId}
            onClear={onClear}
        />
    );
};

export default UserSelect;
