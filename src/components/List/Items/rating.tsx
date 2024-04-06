import type { FC } from "react";
import ListItem from "../item";
import ListItemProps from "../types";
import { Rating } from "@mui/material";

interface ListRatingItemProps extends Omit<ListItemProps, "value"> {
    status: number;
}

const ListRatingItem: FC<ListRatingItemProps> = ({ status, ...props }) => (
    <ListItem {...props}>
        <Rating name="simple-controlled" value={status} readOnly />
    </ListItem>
);

export default ListRatingItem;
