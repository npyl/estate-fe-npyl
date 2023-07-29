import { ListItemProps, Typography } from "@mui/material";
import type { FC } from "react";
import Label from "../label/Label";

import { ILabel } from "src/types/label";
import ListItem from "./item";

type Direction = "horizontal" | "vertical";

interface ListLabelsItemProps extends ListItemProps {
    labels: ILabel[];
    align?: Direction;
    label: string;
}

const ListLabelsItem: FC<ListLabelsItemProps> = (props) => {
    const { labels, label = "Labels", ...other } = props;

    return (
        <ListItem label={label} {...other}>
            {labels.map((label, index) => {
                return (
                    <Label key={index} sx={{ bgcolor: label.color, mr: 1 }}>
                        {label.name}
                    </Label>
                );
            })}
        </ListItem>
    );
};

export default ListLabelsItem;
