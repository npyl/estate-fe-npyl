import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import type { NextPage } from "next";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import BalconiesSection from "src/components/properties/Balconies";
import FeaturesSection from "src/components/properties/Features";
import HeatingAndEnergySection from "src/components/properties/HeatingAndEnergy";
import LocationSection from "src/components/properties/Location";
import ParkingSection from "src/components/properties/Parking";
import SuitableForForResidentialSection from "src/components/properties/SuitableForForResidential";
import TechnicalFeaturesAndInteriorForResidentialSection from "src/components/properties/TechnicalFeaturesAndInteriorForResidential";
import { ImageSection } from "src/pages/property/[propertyId]/components/sections";
import CustomerInformationSection from "./components/sections/customerInformationSection";
import BasicSection from "src/components/properties/Basic";

const CustomerView: NextPage = () => {
  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        {/* customer info */}
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}></Stack>
          <CustomerInformationSection />
        </Grid>

        {/* propertiesview */}
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}></Stack>
        </Grid>
      </Grid>
    </>
  );
};

CustomerView.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerView;
