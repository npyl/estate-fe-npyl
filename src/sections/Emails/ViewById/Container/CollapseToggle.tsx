import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { FC } from "react";

interface Props {
    isCollapsed: boolean;
    onClick: VoidFunction;
}

const CollapseToggle: FC<Props> = ({ isCollapsed, onClick }) => (
    <IconButton onClick={onClick}>
        {isCollapsed ? (
            <CloseFullscreenIcon fontSize="small" />
        ) : (
            <OpenInFullIcon fontSize="small" />
        )}
    </IconButton>
);

export default CollapseToggle;
