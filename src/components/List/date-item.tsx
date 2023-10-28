import type { ListItemProps as MuiListItemProps } from "@mui/material";
import { Box, ListItemText, Typography } from "@mui/material";
import type { FC } from "react";
import { useTheme } from "@mui/material/styles";
import StyledListItem from "./StyledListItem";


type Direction = "horizontal" | "vertical";

interface ListDateItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    value?: string;
}
    

const ListDateItem: FC<ListDateItemProps> = ({
    align = "vertical",
    children,
    disableGutters,
    value,
    label,
    ...other
}) => {
    const theme = useTheme();
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
                                {value ? new Date(value).toDateString() : "-"}
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

export default ListDateItem;
