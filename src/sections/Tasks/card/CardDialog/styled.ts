import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { styled, SxProps, Theme } from "@mui/material/styles";

const DialogSx: SxProps<Theme> = {
    "& .MuiPaper-root": {
        borderRadius: "16px",
    },
};

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(3),
    position: "relative",
    display: "flex",
    boxShadow: theme.shadows[5],
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
    boxShadow: theme.shadows[5],
}));

export {
    DialogSx,
    // ...
    StyledDialogTitle,
    StyledDialogContent,
    StyledDialogActions,
};
