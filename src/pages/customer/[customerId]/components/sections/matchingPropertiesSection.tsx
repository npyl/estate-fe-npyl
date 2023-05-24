import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useGetCustomerByIdQuery } from "src/services/customers";

const columns: GridColDef[] = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 180,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 180,
  },
];

const MatchingPropertiesSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  const customer = useGetCustomerByIdQuery(parseInt(customerId as string)).data;

  if (!customer) return null;

  // const [getSuggestions, { data: suggestions, isSuccess }] =
  //   useCustomerPropertySuggestionsMutation(); // basic details

  // React.useEffect(async () => {
  //   const suggestionRes = await getSuggestions({
  //     id: parseInt(customerId as string),
  //     dataToSend: customer.demand,
  //   }).unwrap();
  // }, []);

  return (
    <Paper
      elevation={10}
      sx={{
        overflow: "auto",
        padding: 0,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">Matching Properties</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            {/* {suggestions && suggestions.length > 0 && (
              <DataGridTable
                rows={suggestions}
                columns={columns}
                resource={"customer"}
                sortingBy={"firstName"}
                sortingOrder={"asc"}
              />
            )} */}
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchingPropertiesSection;
