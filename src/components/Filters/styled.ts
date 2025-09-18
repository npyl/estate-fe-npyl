import {
    Button,
    ButtonProps,
    ListItem as MuiListItem,
    ListItemProps as MuiListItemProps,
    InputLabel,
    Theme,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const getFilterButtonSx = ({
    theme,
    open,
}: {
    theme: Theme;
    open?: boolean;
}) => ({
    backgroundColor: theme.palette.background.paper,
    fontWeight: 400,
    color:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[400]
            : theme.palette.text.secondary,
    fontSize: "16px",
    border: open
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${theme.palette.divider}`,

    "&:hover": {
        border: open
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.common.black}`,
        // Look like OutlinedInput
        borderColor:
            theme.palette.mode === "dark"
                ? theme.palette.neutral?.[500]
                : theme.palette.divider[200],
        backgroundColor: "transparent",
    },
});

interface FilterButtonProps extends ButtonProps {
    open?: boolean;
}

export const FilterButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "open",
})<FilterButtonProps>(getFilterButtonSx);

export const FilterBox = styled(Stack)<FilterButtonProps>((props) => ({
    ...getFilterButtonSx(props),
    flexDirection: "row",
    borderRadius: "7px",
}));

interface ListItemProps extends MuiListItemProps {
    selected?: boolean;
}

export const ListItem = styled(MuiListItem)<ListItemProps>(
    ({ theme, selected }) => ({
        cursor: "pointer",
        borderRadius: "10px",
        "&:hover": {
            backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.neutral?.[200]
                    : theme.palette.neutral?.[800],
        },

        ...(selected
            ? {
                  backgroundColor:
                      theme.palette.mode === "light"
                          ? theme.palette.neutral?.[200]
                          : theme.palette.neutral?.[800],
              }
            : {}),
    })
);

export const StyledInputLabel = styled(InputLabel)({
    textAlign: "center",
});
