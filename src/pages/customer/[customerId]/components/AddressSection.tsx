import { Divider, Paper, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ViewLocation } from "src/components/Location/View";
import { useGetCustomerByIdQuery } from "src/services/customers";

const AddressSection: React.FC = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const { t } = useTranslation();
  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  const location = data?.location;

  if (!location) return;

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
        <Typography variant="h6">{t("Adress Details")}</Typography>
      </Box>
      <Divider />
      <ViewLocation location={location} />
    </Paper>
  );
};

export default AddressSection;
