import Dialog from "@/components/Dialog";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDialog = styled(Dialog)({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            minWidth: "80vw",
            position: "relative",
        },
    },
});

export const StyledContent = styled(DialogContent)(({ theme }) => ({
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: theme.spacing(1),
}));
export const StyledActions = styled(DialogActions)({
    position: "absolute",
    bottom: 0,
    right: 0,
});

export const DescriptionField = styled(RHFTextField)({
    "& .MuiInputBase-root": {
        height: "auto!important",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: 1,
    },
});
