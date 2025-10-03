import { styled, SxProps, Theme } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

// --------------------------------------------------------------------------------------

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

interface Props extends Omit<TextFieldProps<"outlined">, "variant"> {
    open: boolean;
}

const SelectableTextField = styled(TextField)<Props>(
    ({ value, open, theme }) => ({
        // INFO: look like selectable
        ".MuiInputBase-root": {
            cursor: open ? "default" : "pointer",
        },
        // INFO: style for when it has `value`
        ...(value && !open ? getWithValueSx(theme) : {}),
    })
);

// --------------------------------------------------------------------------------------

const getMobileOpenSx = (theme: Theme): SxProps<Theme> => ({
    position: "absolute",

    left: 0,
    top: "50%",
    transform: "translateY(-50%)",

    minWidth: `calc(100vw - ${theme.spacing(2)})`,
    width: `calc(100vw - ${theme.spacing(2)})`,

    zIndex: theme.zIndex.modal,

    boxShadow: theme.shadows[10],
    borderRadius: 24,

    ".MuiInputBase-root": {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 24,
        height: "60px",
    },
});

const INITIAL_SIZE = "50px";

const getMobileClosedSx = (): SxProps<Theme> => ({
    position: "default",
    minWidth: INITIAL_SIZE,
    width: INITIAL_SIZE,
});

const getMobileSx = (open: boolean, theme: Theme) =>
    open ? getMobileOpenSx(theme) : getMobileClosedSx();

const StyledTextField = styled(SelectableTextField)<Props>(
    ({ theme, open }) => ({
        [theme.breakpoints.up("sm")]: {
            minWidth: open ? "200px" : INITIAL_SIZE,
            width: open ? "200px" : INITIAL_SIZE,
        },
        [theme.breakpoints.down("sm")]: getMobileSx(open, theme),

        transition: open
            ? "min-width 0.2s ease-out, width 0.2s ease-out"
            : undefined,
    })
);

export { INITIAL_SIZE };
export type { Props as StyledSearchProps };
export default StyledTextField;
