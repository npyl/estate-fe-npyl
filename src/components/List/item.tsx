import type { ListItemProps as MuiListItemProps } from "@mui/material";
import { Box, ListItemText, Typography } from "@mui/material";
import { ListItem as MuiListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { FC } from "react";

type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value?: any | null;
}


const ListItem: FC<ListItemProps> = (props) => {
    const theme = useTheme();
    const {
        align = "vertical",
        children,
        disableGutters,
        value,
        label,
        ...other
    } = props;

    return (
        <MuiListItem
            sx={{
                px: disableGutters ? 0 : 3,

                flex: 1,

                "&:nth-of-type(odd)": {
                    background: theme.palette.mode === "dark" ? "transparent" : "white",
                },
                "&:nth-of-type(even)": {
                    background: theme.palette.mode === "dark" ? "transparent" : "#fcfcfc",
                },
            }}
            {...other}
        >
            <ListItemText
                disableTypography
                primary={<Typography variant="subtitle2">{label}</Typography>}
                secondary={
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        {children || (
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                sx={{
                                    float: "right",
                                }}
                            >
                                {value?.toString() || ""}
                            </Typography>
                        )}
                    </Box>
                }
                sx={{
                    display: "flex",
                    my: 0,
                }}
            />
        </MuiListItem>
    );
};

export default ListItem;
