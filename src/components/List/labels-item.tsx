import { Chip, ListItemProps } from "@mui/material";
import { Typography } from "@mui/material";
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
            <Chip
              key={index}
              label={label.name}
              color="info"
              sx={{ mr: 1 }}
            ></Chip>
          );
        })}
      </Typography>
    </ListItem>
  );
};

export default ListLabelsItem;
