import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import ListItem from "../item";
import ListItemProps from "../types";

interface ListStatusItemProps extends Omit<ListItemProps, "value"> {
    status: boolean;
}

//
// Like the boolean list item but with a bulb icon (λυχνία)
//

const ListStatusItem: FC<ListStatusItemProps> = ({ status, ...other }) => (
    <ListItem {...other}>
        <Stack direction="row" spacing={1}>
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
        </Stack>
    </ListItem>
);

export default ListStatusItem;
