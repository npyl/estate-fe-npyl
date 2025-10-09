import { styled, Theme } from "@mui/material/styles";
import UncontrolledTextField, {
    UncontrolledTextFieldProps,
} from "./UncontrolledTextField";

const getWithValueSx = (theme: Theme) => ({
    ".MuiInputBase-root": {
        // INFO: look like selectable
        cursor: "pointer",

        backgroundColor: theme.palette.primary.main,
    },

    ".MuiOutlinedInput-notchedOutline": {
        border: 0,
    },

    ".MuiSvgIcon-root": {
        color: "white",
    },
});

interface SelectableTextFieldProps extends UncontrolledTextFieldProps {
    open: boolean;
}

const SelectableTextField = styled(
    UncontrolledTextField
)<SelectableTextFieldProps>(({ value, open, theme }) => ({
    // INFO: look like selectable
    ".MuiInputBase-root": {
        cursor: open ? "default" : "pointer",
    },
    // INFO: style for when it has `value`
    ...(value && !open ? getWithValueSx(theme) : {}),
}));

export type { SelectableTextFieldProps };
export default SelectableTextField;
