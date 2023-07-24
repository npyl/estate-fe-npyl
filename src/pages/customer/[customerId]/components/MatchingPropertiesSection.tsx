import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSuggestForCustomerQuery } from "src/services/properties";
import DataGridTable from "src/components/DataGrid";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const MatchingPropertiesSection: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: "propertyImage",
      headerName: "Photo",
      width: 180,
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
  const { data } = useSuggestForCustomerQuery(parseInt(customerId as string)); // basic details
  const { t } = useTranslation();
  if (!data || !Array.isArray(data) || data.length === 0) return null;

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
        <Typography variant="h6">{t("Matching Properties")}</Typography>
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
