import type { FC, ReactNode } from "react";

import { Box, Button, Typography } from "@mui/material";

import { Plus as PlusIcon } from "../../icons/plus";

interface CalendarToolbarProps {
  children?: ReactNode;
  onAddClick?: () => void;
}

export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
  const { onAddClick, ...other } = props;

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        px: 3,
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
      {...other}
    >
      <Typography variant='h5'>Calendar</Typography>

      <Button
        onClick={onAddClick}
        startIcon={<PlusIcon fontSize='small' />}
        sx={{
          m: 1,
          order: {
            xs: -1,
            md: 0,
          },
          width: {
            xs: "100%",
            md: "auto",
          },
        }}
        variant='contained'
      >
        New Event
      </Button>
    </Box>
  );
};
