import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useSuggestForCustomerQuery } from "src/services/properties";
import type { NextPage } from "next";
import DataGridTable from "src/components/DataGrid";
import { useRouter } from "next/router";

import Image from "src/components/image";

const MatchingPropertiesSection: NextPage = () => {
  const columns: GridColDef[] = [
    {
      field: "propertyImage",
      headerName: "Photo",
      width: 180,
      //   renderCell: renderImage,
    },
    {
      field: "code",
      headerName: "Code",
      width: 180,
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
    },
  ];
  const router = useRouter();
  const { customerId } = router.query;
  const { data } = useSuggestForCustomerQuery(
    parseInt(customerId as string)
  ); // basic details

  if (!data) return null;

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
        <Typography variant="h6">Owned Properties</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <DataGridTable
              rows={data}
              columns={columns}
              resource={"property"}
              sortingBy={"firstName"}
              sortingOrder={"asc"}
              page={0}
              pageSize={10}
            />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MatchingPropertiesSection;
