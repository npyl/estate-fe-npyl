import { styled, SxProps, Theme } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const getMobileOpenSx = (theme: Theme): SxProps<Theme> => ({
    position: "absolute",

    left: 0,

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

const getMobileClosedSx = (): SxProps<Theme> => ({
    position: "default",
    minWidth: "50px",
    width: "50px",
});

const getMobileSx = (open: boolean, theme: Theme) =>
    open ? getMobileOpenSx(theme) : getMobileClosedSx();

interface StyledSearchProps
    extends Omit<TextFieldProps<"outlined">, "variant"> {
    open: boolean;
}

const StyledTextField = styled(TextField)<StyledSearchProps>(
    ({ theme, open }) => ({
        minWidth: open ? "200px" : "50px",
        width: open ? "200px" : "50px",

        [theme.breakpoints.down("sm")]: getMobileSx(open, theme),

        transition: "all 0.2s ease-out",
    })
);

export type { StyledSearchProps };
export default StyledTextField;
