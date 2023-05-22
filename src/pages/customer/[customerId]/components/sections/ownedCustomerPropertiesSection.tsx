import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useGetCustomerByIdQuery } from "src/services/customers";

import { useFilterPropertiesMutation } from "src/services/properties";

import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import DataGridTable from "src/components/DataGrid";
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
const OwnedCustomerPropertiesSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  // TODO: check this out tomorrow...

  const [filterProperties, { isLoading }] = useFilterPropertiesMutation();

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
        <Typography variant='h6'>Owned Properties</Typography>
      </Box>

      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <DataGridTable
              rows={data}
              columns={columns}
              resource={"customer"}
              sortingBy={"firstName"}
              sortingOrder={"asc"}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OwnedCustomerPropertiesSection;
