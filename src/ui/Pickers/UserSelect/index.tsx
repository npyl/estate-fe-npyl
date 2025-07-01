import { useAllUsersQuery } from "@/services/user";
import { FC, useCallback } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ClearIcon from "@mui/icons-material/Clear";
import { MouseEvent } from "react";
import AvatarSelectGroup from "@/components/Avatar/SelectGroup";
import dynamic from "next/dynamic";
const MoreAvatars = dynamic(() => import("./MoreAvatars"));

// -------------------------------------------------------------------

interface Props {
    onClick: VoidFunction;
}

const ClearButton: FC<Props> = ({ onClick }) => {
    const handleClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        onClick();
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

interface UserSelectProps {
    userId?: number;
    onChange: (id: number) => void;
    onClear: VoidFunction;
}

const UserSelect: FC<UserSelectProps> = ({ userId, onChange, onClear }) => {
    const { data } = useAllUsersQuery();

    return (
        <AvatarSelectGroup
            max={6}
            // ...
            users={data}
            value={userId}
            onChange={onChange}
            // ...
            MoreAvatars={MoreAvatars}
        >
            {userId !== undefined ? <ClearButton onClick={onClear} /> : null}
        </AvatarSelectGroup>
    );
};

export default UserSelect;
