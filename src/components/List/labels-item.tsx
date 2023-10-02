import { ListItemProps, Typography, Box } from "@mui/material";
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

    // This function truncates the label name if it's more than 16 characters
    const truncateLabelName = (name: string) => {
        return name.length > 19 ? name.substring(0, 19) + "..." : name;
    };

    return (
        <ListItem label={label} {...other}>
            <Box paddingLeft={0} margin={0} display="flex" flexWrap="wrap">
                {labels.map((label, index) => {
                    return (
                        <Label key={index} sx={{ bgcolor: label.color, mr: 1 }}>
                            {truncateLabelName(label.name)}
                        </Label>
                    );
                })}
            </Box>
        </ListItem>
    );
};

export default ListLabelsItem;
