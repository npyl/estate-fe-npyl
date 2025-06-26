import { useAllUsersQuery } from "@/services/user";
import { useCallback } from "react";
import { useFiltersContext } from "@/sections/Tasks/filters";
import ToggleButton from "@mui/material/ToggleButton";
import ClearIcon from "@mui/icons-material/Clear";
import { MouseEvent } from "react";
import AvatarSelectGroup from "@/components/Avatar/SelectGroup";
import dynamic from "next/dynamic";
const MoreAvatars = dynamic(() => import("./MoreAvatars"));

// -------------------------------------------------------------------

const ClearButton = () => {
    const { setAssigneeId } = useFiltersContext();

    const handleClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setAssigneeId(undefined);
    }, []);

    return (
        <ToggleButton
            value=""
            onClick={handleClear}
            size="small"
            sx={{
                width: "30px",
                height: "30px",
                borderRadius: "100%",
            }}
        >
            <ClearIcon fontSize="small" />
        </ToggleButton>
    );
};

// -------------------------------------------------------------------

const UserSelect = () => {
    const { data } = useAllUsersQuery();
    const { filters, setAssigneeId } = useFiltersContext();
    const { assigneeId } = filters || {};

    return (
        <AvatarSelectGroup
            max={6}
            // ...
            users={data}
            value={assigneeId}
            onChange={setAssigneeId}
            // ...
            MoreAvatars={MoreAvatars}
        >
            {assigneeId !== undefined ? <ClearButton /> : null}
        </AvatarSelectGroup>
    );
};

export default UserSelect;
