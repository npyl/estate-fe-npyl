import { styled, SxProps, Theme } from "@mui/material/styles";
import SelectableTextField, {
    SelectableTextFieldProps,
} from "./SelectableTextField";

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

interface StyledTextFieldProps extends SelectableTextFieldProps {}

const StyledTextField = styled(SelectableTextField)<StyledTextFieldProps>(
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
export type { StyledTextFieldProps };
export default StyledTextField;
