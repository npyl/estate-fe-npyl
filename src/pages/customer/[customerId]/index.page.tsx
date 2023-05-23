import { Grid, Stack } from "@mui/material";

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

import ViewHeader from "src/pages/components/ViewHeader";

const CustomerView: NextPage = () => {
  // customer
  const router = useRouter();
  const { customerId } = router.query;
  const [deleteCustomer, { isSuccess }] = useDeleteCustomerMutation();

  const handleEdit = () => {
    router.push(`/customer/edit/${customerId}`);
  };
  const handleDelete = () => {
    deleteCustomer(parseInt(customerId as string));
  };

  isSuccess && router.push("/customer");

  return (
    <>
      <Grid container paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={12}>
          <ViewHeader
            resource="customer"
            onEdit={handleEdit}
            onDelete={handleDelete}
          ></ViewHeader>
        </Grid>

        {/* customer info */}
        <Grid item xs={6} spacing={1} order={"row"}>
          <Stack spacing={1}>
            <CustomerInformationSection />
            <CustomerAdressDetailsSection />
            <DemandCustomerSection />

            <NotesCustomerSection />
          </Stack>
        </Grid>

        {/* propertiesview */}
        <Grid item xs={6} spacing={1}>
          <Stack spacing={1}>
            <MatchingPropertiesSection />
            <OwnedCustomerPropertiesSection />
          </Stack>
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
