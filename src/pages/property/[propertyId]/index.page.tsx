import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetPropertyByIdQuery } from "src/services/properties";

import { Box } from "@mui/system";
import TabPanel from "src/components/Tabs";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "photoswipe/dist/photoswipe.css";

import { Paper } from "@mui/material";
import MainContainer from "./components/MainContainer";

import {
  AreaSection,
  BalconiesSection,
  BasicSection,
  DetailsSection,
  DistanceSection,
  BlueprintsSection,
  HeatingSection,
  ImageSection,
  ParkingsSection,
  NotesSection,
  VideoSection,
  SuitableFor,
  TechnicalFeatures,
} from "./components/sections";

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

  const { data } = useGetPropertyByIdQuery(parseInt(propertyId as string)); // basic details
  if (!data) {
    return null;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Paper sx={{ borderBottom: 1, borderColor: "divider", paddingX: 3 }}>
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
        </Tabs>
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
    </Box>
  );
};

SingleProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleProperty;
