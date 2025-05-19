import type { FC } from "react";
import ListItemProps from "../types";
import ListItem from "../item";
import Skeleton from "@mui/material/Skeleton";

interface SkeletonListItemProps extends Omit<ListItemProps, "value"> {}

const SkeletonListItem: FC<SkeletonListItemProps> = (props) => (
    <ListItem {...props}>
        <Skeleton variant="text" animation="wave" width="20%" />
    </ListItem>
);

export default SkeletonListItem;
