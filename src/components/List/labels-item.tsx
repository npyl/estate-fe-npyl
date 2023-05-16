import { ListItemProps } from "@mui/material";
import { Typography } from "@mui/material";
import Label from "../label/Label";
import type { FC } from "react";

import ListItem from "./item";
import { ILabel } from "src/types/label";

interface ListLabelsItemProps extends ListItemProps {
  labels: ILabel[];
}

const ListLabelsItem: FC<ListLabelsItemProps> = (props) => {
  const { labels, ...other } = props;

  return (
    <ListItem label={"Labels"} {...other}>
      <Typography
        color="textSecondary"
        variant="body2"
        sx={{
          float: "right",
        }}
      >
        {labels.map((label, index) => {
          return (
            <Label key={index} sx={{ bgcolor: label.color, mr: 1 }}>
              {label.name}
            </Label>
          );
        })}
      </Typography>
    </ListItem>
  );
};

export default ListLabelsItem;
