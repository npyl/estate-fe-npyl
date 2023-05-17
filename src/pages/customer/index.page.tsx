import { Box, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import type { NextPage } from "next";
import DataGridTable from "src/components/DataGrid";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllCustomersQuery } from "src/services/customers";

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

const Customers: NextPage = () => {
  const { data } = useAllCustomersQuery();

  if (!data) return null;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Paper sx={{ mt: 2 }}>
          <DataGridTable
            rows={data}
            columns={columns}
            resource={"customer"}
            sortingBy={"firstName"}
            sortingOrder={"asc"}
          />
        </Paper>
      </Box>
    </>
  );
};

Customers.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Customers;
