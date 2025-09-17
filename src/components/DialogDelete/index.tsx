import { DialogContent, DialogContentProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { HighlightOff as HighlightOffIcon } from "@mui/icons-material";
import { FC } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";
import Content from "./Content";
import Actions from "./Actions";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ textAlign: "center", ...sx }} {...props} />
);

const DeleteIcon = styled(HighlightOffIcon)(({ theme }) => ({
    fontSize: "100px",
    stroke:
        theme.palette.mode === "dark" ? theme.palette.neutral?.[900] : "Window",
    strokeWidth: 1.5,
    color: theme.palette.error.main,
}));

interface DeleteDialogProps extends DialogProps {
    loading?: boolean;
    multiple?: boolean;
    onDelete: () => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
    multiple = false,
    loading = false,
    onDelete,
    ...props
}) => (
    <Dialog
        maxWidth="xs"
        closeAfterTransition={true}
        DialogContentComponent={StyledContent}
        // ...
        title={<DeleteIcon />}
        content={<Content multiple={multiple} />}
        actions={
            <Actions
                loading={loading}
                onDelete={onDelete}
                onClose={props.onClose}
            />
        }
        {...props}
    />
);

export default DeleteDialog;
