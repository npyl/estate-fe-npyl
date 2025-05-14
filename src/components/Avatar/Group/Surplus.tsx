import MuiAvatar from "@mui/material/Avatar";
import { ComponentType, FC, useRef } from "react";
import useDialog from "@/hooks/useDialog";
import { TUser } from "../types";
import { MoreAvatarsProps } from "./types";

interface SurplusProps {
    users: TUser[];
    surplus: number;

    value?: TUser["id"];
    onChange?: (id: TUser["id"]) => void;

    MoreAvatars?: ComponentType<MoreAvatarsProps>;
}

const Surplus: FC<SurplusProps> = ({
    value,
    onChange,
    // ...
    users,
    surplus,
    // ...
    MoreAvatars,
}) => {
    const anchorRef = useRef(null);

    const [isOpen, openMore, closeMore] = useDialog();

    return (
        <>
            <MuiAvatar
                ref={anchorRef}
                onClick={openMore}
                sx={{ cursor: "pointer" }}
            >
                +{surplus}
            </MuiAvatar>

            {MoreAvatars && anchorRef.current && isOpen ? (
                <MoreAvatars
                    value={value}
                    onChange={onChange}
                    // ...
                    anchorEl={anchorRef.current}
                    users={users}
                    onClose={closeMore}
                />
            ) : null}
        </>
    );
};

export default Surplus;
