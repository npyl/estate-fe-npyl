import type { FC } from "react";
import ListItem from "../item";
import ListItemProps from "../types";

const ListDateItem: FC<ListItemProps> = ({ value, ...props }) => (
    <ListItem {...props}>
        {value ? new Date(value).toDateString() : "-"}
    </ListItem>
);

export default ListDateItem;
