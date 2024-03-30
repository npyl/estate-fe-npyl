import type { ListItemProps as MuiListItemProps } from "@mui/material";
import { Box, ListItemText, Typography } from "@mui/material";
import StyledListItem from "../styled";
import type { FC } from "react";

type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value?: number;
}

const DistanceListItem: FC<ListItemProps> = (props) => {
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
                                {value
                                    ? value >= 1000
                                        ? `${(value / 1000).toFixed(1)} km`
                                        : `${value} m`
                                    : ""}
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

export default DistanceListItem;
