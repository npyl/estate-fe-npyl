import MuiAvatar from "@mui/material/Avatar";
import { ComponentType, FC, useRef } from "react";
import useDialog from "@/hooks/useDialog";
import { MoreAvatarsProps, TUser } from "./types";

interface SurplusProps {
    users: TUser[];
    surplus: number;
    MoreAvatars?: ComponentType<MoreAvatarsProps>;
}

const Surplus: FC<SurplusProps> = ({ users, surplus, MoreAvatars }) => {
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
                    anchorEl={anchorRef.current}
                    users={users}
                    onClose={closeMore}
                />
            ) : null}
        </>
    );
};

export default Surplus;
