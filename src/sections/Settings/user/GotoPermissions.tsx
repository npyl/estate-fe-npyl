import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FC } from "react";
import { PERMISSIONS_TAB_ID } from "../constant";
import Link from "@/components/Link";
import stopPropagation from "@/utils/stopPropagation";

interface GotoPermissionsProps {
    userId: number;
}

const GotoPermissions: FC<GotoPermissionsProps> = ({ userId }) => (
    <Button
        LinkComponent={Link}
        href={`/settings?tab=${PERMISSIONS_TAB_ID}&userId=${userId}`}
        variant="text"
        onClick={stopPropagation}
        sx={{ color: "#5e5e5e" }}
    >
        <VisibilityIcon fontSize="small" />
    </Button>
);

export default GotoPermissions;
