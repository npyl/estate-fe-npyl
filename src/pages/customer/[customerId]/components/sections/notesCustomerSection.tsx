import { Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import {
  ListItem,
  ListManagerItem,
  ListBooleanItem,
  ListStatusItem,
} from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import {
  useAllCustomersQuery,
  useGetCustomerByIdQuery,
} from "src/services/customers";
import { useRouter } from "next/router";

const NotesCustomerSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  const location = data?.location;
  if (!data || !location) {
    return null;
  }

  return (
    <Paper
      elevation={10}
      sx={{
        overflow: "auto",
        padding: 0.5,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Notes</Typography>
      </Box>
      <Grid container></Grid>
    </Paper>
  );
};

export default NotesCustomerSection;
