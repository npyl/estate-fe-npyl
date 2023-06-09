import { Box, Tab, Tabs } from "@mui/material";
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

import { addTab, deleteTabWithPath } from "src/slices/tabs";

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

import ViewHeader from "src/pages/components/ViewHeader";

import "photoswipe/dist/photoswipe.css";
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

  const dispatch = useDispatch();
  const [deleteProperty, { isSuccess: isDeleteSuccess }] =
    useDeletePropertyMutation();

  const { data } = useGetPropertyByIdQuery(parseInt(propertyId as string)); // basic details
  if (!data) {
    return null;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleEdit = () => {
    router.push(`/property/edit/${propertyId}`);
    // add tab
    dispatch(
      addTab({
        path: `/property/edit/${propertyId}`,
        title: `Edit Property ${propertyId}`,
      })
    );
  };

  const handleDelete = () => {
    deleteProperty(parseInt(propertyId as string));
  };

  // upon successful delete
  if (isDeleteSuccess) {
    router.push("/");
    // remove tab on succesfull delete
    isDeleteSuccess && dispatch(deleteTabWithPath(`/property/${propertyId}`));
  }

  return (
    <Box sx={{ width: "100%", paddingY: 1 }}>
      <ViewHeader
        resource='customer'
        onEdit={handleEdit}
        onDelete={handleDelete}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='View Property Tabs'
        >
          <Tab label='Overview' {...a11yProps(0)} />
          <Tab label='Quick View' {...a11yProps(1)} />
          <Tab label='Tickets' {...a11yProps(2)} />
          <Tab label='Activities' {...a11yProps(3)} />
          <Tab label='Storage' {...a11yProps(4)} />
          <Tab label='Connections' {...a11yProps(5)} />
          <Tab label='Map' {...a11yProps(6)} />
        </Tabs>
      </ViewHeader>
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
          NotesSection={<NotesSection />}
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
