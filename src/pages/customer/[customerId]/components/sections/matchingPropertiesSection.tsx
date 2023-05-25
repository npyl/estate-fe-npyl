import { Box, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useGetCustomerPropertySuggestionsQuery } from "src/services/customers";
import type { NextPage } from "next";
import DataGridTable from "src/components/DataGrid";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllCustomersQuery } from "src/services/customers";

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

const MatchingPropertiesSection: NextPage = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const { data } = useGetCustomerPropertySuggestionsQuery(
    parseInt(customerId as string)
  ); // basic details

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
            resource={"property"}
            sortingBy={"firstName"}
            sortingOrder={"asc"}
          />
        </Paper>
      </Box>
    </>
  );
};

export default MatchingPropertiesSection;
