import { PropsWithChildren } from "react";
import { StyledTitle } from "./styled";
import { SpaceBetween } from "@/components/styled";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface DialogTitleProps extends PropsWithChildren {
    onClose: VoidFunction;
}

const DialogTitle: React.FC<DialogTitleProps> = ({ onClose, children }) => (
    <StyledTitle gap={1}>
        <SpaceBetween width={1} alignItems="center">
            {children}
        </SpaceBetween>
        <IconButton onClick={onClose}>
            <CloseIcon />
        </IconButton>
    </StyledTitle>
);

export default DialogTitle;
