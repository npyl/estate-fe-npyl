import { useFiltersContext } from "@/sections/Blog/ViewAll/Filters/Context";
import UserSelect from "@/ui/Pickers/UserSelect";
import { useCallback } from "react";

const User = () => {
    const { filters, setUsers } = useFiltersContext();
    const { users } = filters || {};
    const userId = users?.at(0);

    const onChange = useCallback((id: number) => setUsers([id]), []);

    const onClear = useCallback(() => setUsers([]), []);

    return <UserSelect userId={userId} onChange={onChange} onClear={onClear} />;
};

export default User;
