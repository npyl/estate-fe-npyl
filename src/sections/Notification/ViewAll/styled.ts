import { FormControl } from "@mui/material";
import { styled } from "@mui/material";

const FilterFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 120,
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,

    "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
        fontSize: "medium",
    },
    "& .MuiSelect-select": {
        padding: theme.spacing(1),
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.divider,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.text.primary,
        },
    },
}));

export { FilterFormControl };
