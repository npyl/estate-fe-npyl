import { Typography } from "@mui/material";
import type { FC } from "react";
import { useTheme } from "@mui/material/styles";

import ListItem from "./item";
import type { ListItemProps as MuiListItemProps } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

type Direction = "horizontal" | "vertical";

interface ListBooleanItemProps extends MuiListItemProps {
    align?: Direction;
    label: string;
    status: boolean;
}

const ListBooleanItem: FC<ListBooleanItemProps> = (props) => {
    const theme = useTheme();
    const {
        align = "vertical",
        status,
        children,
        disableGutters,
        value,
        label,
        ...other
    } = props;

    return (
        <ListItem
            label={label}
            sx={{
                px: disableGutters ? 0 : 3,

                flex: 1,

                "&:nth-of-type(odd)": {
                    background: theme.palette.mode === "dark" ? "transparent" : "#white",
                },
                "&:nth-of-type(even)": {
                    background: theme.palette.mode === "dark" ? "transparent" : "#fcfcfc",
                },
            }}
            {...other}
        >
            <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                    float: "right",
                }}
            >
                {status ? (
                    <DoneIcon
                        sx={{ color: "success.main", fontSize: "inherit" }}
                    />
                ) : (
                    <ClearIcon
                        sx={{ color: "error.main", fontSize: "inherit" }}
                    />
                )}
            </Typography>
        </ListItem>
    );
};

export default ListBooleanItem;
