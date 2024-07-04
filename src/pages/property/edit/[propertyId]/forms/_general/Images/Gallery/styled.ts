import Dialog from "@/components/Dialog";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { styled } from "@mui/material/styles";

export const StyledDialog = styled(Dialog)({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            minWidth: "80vw",
        },
    },
});

export const DescriptionField = styled(RHFTextField)({
    "& .MuiInputBase-root": {
        height: "auto!important",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: 1,
    },
});
