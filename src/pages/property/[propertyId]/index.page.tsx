import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDeletePropertyMutation,
  useGetPropertyByIdQuery,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import MainContainer from "./components/MainContainer";

import { SoftButton } from "./styles";

import {
  AreaSection,
  BalconiesSection,
  BasicSection,
  BlueprintsSection,
  DetailsSection,
  DistanceSection,
  HeatingSection,
  ImageSection,
  NotesSection,
  ParkingsSection,
  SuitableFor,
  TechnicalFeatures,
  VideoSection,
} from "./components/sections";

import "photoswipe/dist/photoswipe.css";
import Iconify from "src/components/iconify/Iconify";
import InitMap from "./components/Map";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SingleProperty: NextPage = () => {
  const router = useRouter();
  const { propertyId } = router.query;

  const [value, setValue] = useState(0);
  const [deletePropertyDialogOpen, setDeletePropertyDialogOpen] =
    useState(false);

  const dispatch = useDispatch();
  const [deleteProperty, { isSuccess }] = useDeletePropertyMutation();

  const { data } = useGetPropertyByIdQuery(parseInt(propertyId as string)); // basic details
  if (!data) {
    return null;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // upon successful delete
  if (isSuccess) router.push("/");

  return (
    <Box sx={{ width: "100%", paddingY: 3 }}>
      <Paper sx={{ borderBottom: 1, borderColor: "divider", paddingX: 3 }}>
        <Grid container direction={"row"}>
          <Grid item flex={1}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="View Property Tabs"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Deals" {...a11yProps(1)} />
              <Tab label="Tickets" {...a11yProps(2)} />
              <Tab label="Activities" {...a11yProps(3)} />
              <Tab label="Storage" {...a11yProps(4)} />
              <Tab label="Logs" {...a11yProps(5)} />
              <Tab label="Map" {...a11yProps(6)} />
            </Tabs>
          </Grid>
          <Grid item sx={{ mt: 1 }}>
            <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>
              Edit
            </Button>

            <SoftButton
              color="error"
              onClick={() => {
                setDeletePropertyDialogOpen(true);
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </SoftButton>

            <Dialog
              fullWidth
              maxWidth="xs"
              open={deletePropertyDialogOpen}
              onClose={() => {
                setDeletePropertyDialogOpen(false);
              }}
              closeAfterTransition={true}
            >
              <DialogTitle>Delete Property</DialogTitle>
              <DialogContentText ml={3}>Are you sure?</DialogContentText>
              <DialogContent>
                <SoftButton
                  color="error"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    deleteProperty(parseInt(propertyId as string));
                    setDeletePropertyDialogOpen(false);
                  }}
                  startIcon={<Iconify icon={"eva:trash-2-outline"} />}
                >
                  Yes
                </SoftButton>

                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setDeletePropertyDialogOpen(false);
                  }}
                >
                  No
                </Button>
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      </Paper>
      <TabPanel value={value} index={0}>
        <MainContainer
          ImageSection={<ImageSection data={data} />}
          BasicSection={<BasicSection data={data} />}
          DetailsSection={<DetailsSection data={data} />}
          HeatingSection={<HeatingSection data={data} />}
          AreaSection={<AreaSection data={data} />}
          DistanceSection={<DistanceSection data={data} />}
          ParkingsSection={<ParkingsSection data={data} />}
          BalconiesSection={<BalconiesSection data={data} />}
          BlueprintsSection={<BlueprintsSection data={data} />}
          NotesSection={<NotesSection data={data} />}
          VideoSection={<VideoSection data={data} />}
          SuitableFor={<SuitableFor data={data} />}
          TechnicalFeatures={<TechnicalFeatures data={data} />}
        />
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
      <TabPanel value={value} index={4}></TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
      <TabPanel value={value} index={6}>
        <Box height={"400px"} width={"100%"}>
          <InitMap />
        </Box>
      </TabPanel>
    </Box>
  );
};

SingleProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleProperty;
