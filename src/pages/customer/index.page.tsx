import { Box, Paper, Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import DataGridTable from "src/components/DataGrid";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllCustomersPaginatedQuery } from "src/services/customers";
import { ICustomer } from "src/types/customer";

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
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 180,
  },
  {
    field: "city",
    headerName: "City",
    width: 180,
  },
];

const Customers: NextPage = () => {
  const { data, isFetching } = useAllCustomersPaginatedQuery({ page: 0, pageSize: 25 });
  const [rows, setRows] = useState<ICustomer[]>([]);

  useEffect(() => {
    if (!data) return;
    setRows(data.content);
  }, [data])

  const renderSkeletonCell = () => <Skeleton width={150} animation='wave' />;
  const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
  }));

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
          {rows ? <DataGridTable
            rows={rows}
            columns={columns}
            resource={"customer"}
            sortingBy={"firstName"}
            sortingOrder={"asc"}
            page={0}
            pageSize={25}
          /> :
            <DataGridTable
              rows={skeletonRows}
              columns={columns.map((column) => ({
                ...column,
                renderCell: renderSkeletonCell,
              }))}
              sortingBy={""}
              sortingOrder={"asc"}
              page={0}
              pageSize={25}
            />
          }
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
