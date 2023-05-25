import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";

import type { NextPage } from "next";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import CustomerAdressDetailsSection from "./components/sections/customerAdressSection";
import CustomerInformationSection from "./components/sections/customerInformationSection";

import { useRouter } from "next/router";
import { useDeleteCustomerMutation } from "src/services/customers";
import DemandCustomerSection from "./components/sections/demandCustomerSection";
import MatchingPropertiesSection from "./components/sections/matchingPropertiesSection";
import NotesCustomerSection from "./components/sections/notesCustomerSection";
import OwnedCustomerPropertiesSection from "./components/sections/ownedCustomerPropertiesSection";
import TabPanel from "src/components/Tabs";
import ViewHeader from "src/pages/components/ViewHeader";
import { useState } from "react";
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const CustomerView: NextPage = () => {
  // customer
  const router = useRouter();
  const { customerId } = router.query;
  const [value, setValue] = useState(0);
  const [deleteCustomer, { isSuccess }] = useDeleteCustomerMutation();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleEdit = () => {
    router.push(`/customer/edit/${customerId}`);
  };
  const handleDelete = () => {
    deleteCustomer(parseInt(customerId as string));
  };

  isSuccess && router.push("/customer");

  return (
    <Box sx={{ width: "100%", paddingY: 1 }}>
      <ViewHeader
        resource="customer"
        onEdit={handleEdit}
        onDelete={handleDelete}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="View Property Tabs"
        >
          <Tab label="Customer Information" {...a11yProps(0)} />
          <Tab label="Owned Properties" {...a11yProps(1)} />
          <Tab label="Matching Properties" {...a11yProps(2)} />
        </Tabs>
      </ViewHeader>

      {/* customer info */}
      <TabPanel value={value} index={0}>
        <Grid container spacing={1}>
          <Grid item xs={6} spacing={0} order={"row"}>
            <Stack spacing={1}>
              <CustomerInformationSection />
              <CustomerAdressDetailsSection />
              <DemandCustomerSection />

              <NotesCustomerSection />
            </Stack>
          </Grid>

          {/* propertiesview */}
          <Grid item xs={6} spacing={0}>
            <Stack spacing={1}>
              <MatchingPropertiesSection />
              <OwnedCustomerPropertiesSection />
            </Stack>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <OwnedCustomerPropertiesSection />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MatchingPropertiesSection />
      </TabPanel>
    </Box>
  );
};

CustomerView.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerView;
