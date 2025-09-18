import Dialog from "@/components/Dialog";
import { DialogActions, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            [theme.breakpoints.down("sm")]: {
                borderTopLeftRadius: theme.spacing(2),
                borderTopRightRadius: theme.spacing(2),
            },
        },
    },
}));

const StyledContent = styled(DialogContent)(({ theme }) => ({
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,

    overflowX: "hidden",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
        overflowY: "auto",
    },
}));

const StyledActions = styled(DialogActions)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
}));

export { StyledDialog, StyledContent, StyledActions };
