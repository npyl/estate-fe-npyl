import Dialog from "@/components/Dialog";
import { DialogActions, DialogContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            position: "relative",
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
}));

const StyledActions = styled(DialogActions)({
    position: "absolute",
    bottom: 0,
    right: 0,
});

export { StyledDialog, StyledContent, StyledActions };
