import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FC } from "react";
import { SvgIcon } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

interface DisabledShareButtonProps {
    title: string;
}

const DisabledShareButton: FC<DisabledShareButtonProps> = ({ title }) => (
    <Tooltip title={title}>
        <IconButton>
            <SvgIcon>
                <ShareIcon color="disabled" />
                <path
                    d="M22 2L2 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </SvgIcon>
        </IconButton>
    </Tooltip>
);

export default DisabledShareButton;
