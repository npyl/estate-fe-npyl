import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FC, MouseEvent, useCallback } from "react";
import { useSecurityContext } from "src/contexts/security";
import { useCurrentTab } from "@/components/Tabs";
import { PERMISSIONS_TAB_ID } from "../constant";

interface GotoPermissionsProps {
    userId: number;
}

const GotoPermissions: FC<GotoPermissionsProps> = ({ userId }) => {
    const { setSelectedUser } = useSecurityContext();

    const [_, setTab] = useCurrentTab();

    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setSelectedUser(userId);
            setTab(PERMISSIONS_TAB_ID);
        },
        [userId]
    );

    return (
        <Button variant="text" sx={{ color: "#5e5e5e" }} onClick={handleClick}>
            <VisibilityIcon fontSize="small" />
        </Button>
    );
};

export default GotoPermissions;
