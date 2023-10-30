import type { ListItemProps as MuiListItemProps } from "@mui/material";
import { Box, ListItemText, Typography } from "@mui/material";
import StyledListItem from "./StyledListItem";
import type { FC } from "react";

type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value?: any | null;
}


const ListItem: FC<ListItemProps> = (props) => {
    const {
        align = "vertical",
        children,
        disableGutters,
        value,
        label,
        ...other
    } = props;

    return (
        <StyledListItem
            sx={{
                px: disableGutters ? 0 : 3,
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
        </StyledListItem>
    );
};

export default ListItem;
