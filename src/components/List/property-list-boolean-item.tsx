import type { ListItemProps } from "@mui/material";
import { Typography } from "@mui/material";
import type { FC } from "react";


import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

type Direction = "horizontal" | "vertical";

interface PropertyListItemProps extends ListItemProps {
  align?: Direction;
  label: string;
  status: boolean;
}

export const PropertyListBooleanItem: FC<PropertyListItemProps> = (props) => {
  const { align= 'vertical',status, children, disableGutters, value, label, ...other } = props;

  return (
    <PropertyListItem label={label} {...other}>
      <Typography
        color="textSecondary"
        variant="body2"
        sx={{
          float: "right",
        }}
      >
        {status ? (
          <DoneIcon sx={{ color: "success.main", fontSize: 'inherit' }} />
        ) : (
          <ClearIcon sx={{ color: "error.main", fontSize: 'inherit' }} />
        )}
      </Typography>
    </PropertyListItem>
  );
};




