import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import DataGridTable from "src/components/DataGrid";
import Image from "src/components/image";
import { useTranslation } from "react-i18next";

const OwnedCustomerPropertiesSection: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { customerId } = router.query;

  function renderImage(params: GridCellParams) {
    return (
      <>
        <Image
          src={`data:image/jpeg;base64,${params.formattedValue}` || ""}
          alt=""
          ratio="16/9"
          width={1}
        />
      </>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "propertyImage",
      headerName: "Photo",
      width: 180,
      renderCell: renderImage,
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

  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  if (
    !data ||
    !Array.isArray(data.ownedProperties) ||
    data.ownedProperties.length === 0
  ) {
    return null;
  }

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
        <Typography variant="h6">{t("Owned Properties")}</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <DataGridTable
              rows={data.ownedProperties}
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

export default OwnedCustomerPropertiesSection;
