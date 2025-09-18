import RHFTextField from "@/components/hook-form/RHFTextField";
import { styled } from "@mui/material/styles";

const DescriptionField = styled(RHFTextField)({
    "& .MuiInputBase-root": {
        height: "auto!important",
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
        padding: 1,
    },
});

export default DescriptionField;
