import { alpha, Stack, StackProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledSearchStack = styled((props: StackProps) => (
    <Stack {...props} />
))(({ theme }) => ({
    margin: 0,

    border: `dashed 1px transparent`,
    borderBottomColor: theme.palette.divider,
    "&:last-of-type": {
        borderBottomColor: "transparent",
    },
    "&:hover": {
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.hoverOpacity
        ),
    },
}));
