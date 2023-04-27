import type { ListItemProps as MuiListItemProps } from "@mui/material";
import { Box, ListItemText, Typography } from "@mui/material";
import { ListItem as MuiListItem } from "@mui/material";
import type { FC } from "react";

type Direction = "horizontal" | "vertical";

interface ListItemProps extends MuiListItemProps {
  align?: Direction;
  label: string;
  status?: string;
}

const ListItem: FC<ListItemProps> = (props) => {
  const {
    align = "vertical",
    children,
    disableGutters,
    status,
    label,
    ...other
  } = props;

  return (
    <MuiListItem
      sx={{
        px: disableGutters ? 0 : 3,

        flex: 1,

        "&:nth-of-type(odd)": {
          backgroundColor: "white",
        },
        "&:nth-of-type(even)": {
          backgroundColor: "#F9FBFB",
        },
      }}
      {...other}
    >
      <ListItemText
        disableTypography
        primary={<Typography variant="subtitle2">{label}</Typography>}
        secondary={
          <Box
            sx={{
              flex: 1,
            }}
          >
            {children || (
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{
                  float: "right",
                }}
              >
                {status}
              </Typography>
            )}
          </Box>
        }
        sx={{
          display: "flex",
          my: 0,
        }}
      />
    </MuiListItem>
  );
};

export default ListItem;