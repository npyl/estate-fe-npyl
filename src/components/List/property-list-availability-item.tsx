import type { ListItemProps } from "@mui/material";
import { Box, Typography } from "@mui/material";
import type { FC } from "react";

import { PropertyListItem } from "./list-item";

import Brightness1Icon from "@mui/icons-material/Brightness1";

type Direction = "horizontal" | "vertical";

interface PropertyListStatusItemProps extends ListItemProps {
  align?: Direction;
  label: string;
  status: string|boolean;
}

//
// Like the boolean list item but with a bulb icon (λυχνία)
//

export const PropertyListStatusItem: FC<PropertyListStatusItemProps> = (
  props
) => {
  const { align='vertical', children, disableGutters, status, label, ...other } = props;

  return (
    <PropertyListItem label={label} {...other}>
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
          {status ? "Available" : "Unavailable"}
        </Typography>
      </Box>
    </PropertyListItem>
  );
};


