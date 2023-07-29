import type { ListItemProps } from "@mui/material";
import { Box, Typography } from "@mui/material";
import type { FC } from "react";

import ListItem from "./item";

import Brightness1Icon from "@mui/icons-material/Brightness1";

type Direction = "horizontal" | "vertical";

interface ListStatusItemProps extends ListItemProps {
    align?: Direction;
    label: string;
    status: string | boolean;
}

//
// Like the boolean list item but with a bulb icon (λυχνία)
//

const ListStatusItem: FC<ListStatusItemProps> = (props) => {
    const {
        align = "vertical",
        children,
        disableGutters,
        status,
        label,
        ...other
    } = props;

    return (
        <ListItem label={label} {...other}>
            <Box
                sx={{
                    float: "right",
                }}
            >
                <Brightness1Icon
                    sx={{
                        color: status ? "success.main" : "error.main",
                        float: "right",
                        fontSize: 18,
                    }}
                />

                <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{
                        float: "right",
                        paddingRight: 1,
                        color: status ? "success.main" : "error.main",
                    }}
                >
                    {status ? "On Market" : "Private"}
                </Typography>
            </Box>
        </ListItem>
    );
};

export default ListStatusItem;
