import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FC, MouseEvent } from "react";
import { useSecurityContext } from "src/contexts/security";

interface GotoPermissionsProps {
    userId: number;
    onGotoPermissions: VoidFunction;
}

const GotoPermissions: FC<GotoPermissionsProps> = ({
    userId,
    onGotoPermissions,
}) => {
    const { setSelectedUser } = useSecurityContext();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setSelectedUser(userId);
        onGotoPermissions();
    };

    return (
        <Button variant="text" sx={{ color: "#5e5e5e" }} onClick={handleClick}>
            <VisibilityIcon fontSize="small" />
        </Button>
    );
};

export default GotoPermissions;
