import type { ListItemProps } from "@mui/material";
import { Typography } from "@mui/material";
import type { FC } from "react";

import ListItem from "./item";

import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

type Direction = "horizontal" | "vertical";

interface ListBooleanItemProps extends ListItemProps {
    align?: Direction;
    label: string;
    status: boolean;
}

const ListBooleanItem: FC<ListBooleanItemProps> = (props) => {
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
        <ListItem label={label} {...other}>
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
