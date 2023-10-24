import { Box, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    useDeletePropertyMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import MainContainer from "./MainContainer";

import {
    AddressSection,
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
} from "./sections";

import ViewHeader from "src/pages/components/ViewHeader";

import "photoswipe/dist/photoswipe.css";
import InitMap from "./Map";
import ConstructionSection from "./sections/ConstructionSection";
import DescriptionSection from "./sections/DescriptionSection";
import Features from "./sections/FeaturesSection";
import MatchingCustomersSection from "./sections/MatchingCustomers";
import PhotosOnly from "./sections/PhotosOnly";

import { useTranslation } from "react-i18next";

import { useTabsContext } from "src/contexts/tabs";
import PropertyLogs from "./sections/Logs";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const SingleProperty: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { removeTab, pushTab } = useTabsContext();

    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!); // basic details
    const [deleteProperty] = useDeletePropertyMutation();

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (data && propertyId) {
            pushTab({
                path: `/property/${propertyId}`,
                id: propertyId as string,
                label: `Property ${propertyId}`,
            });
        }
    }, [data, propertyId]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    const handleEdit = () => router.push(`/property/edit/${propertyId}`);
    const handleDelete = () =>
        deleteProperty(+propertyId!).then(() => {
            router.push("/");
            removeTab(propertyId as string);
        });

    if (!data) return null;

    return (
        <Box sx={{ width: "100%", paddingY: 1 }}>
            <ViewHeader onEdit={handleEdit} onDelete={handleDelete}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="View Property Tabs"
                >
                    <Tab label={t("Overview")} {...a11yProps(0)} />
                    <Tab label={t("Quick View")} {...a11yProps(1)} />
                    <Tab label={t("Tickets")} {...a11yProps(2)} />
                    <Tab label={t("Matching Customers")} {...a11yProps(3)} />
                    <Tab label={t("Photos")} {...a11yProps(4)} />
                    <Tab label={t("Connections")} {...a11yProps(5)} />
                    <Tab label={t("Logs")} {...a11yProps(6)} />
                    <Tab label={t("Map")} {...a11yProps(7)} />
                </Tabs>
            </ViewHeader>
            <TabPanel value={value} index={0}>
                <MainContainer
                    AddressSection={<AddressSection />}
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
                    DescriptionSection={<DescriptionSection data={data} />}
                    ConstructionSection={<ConstructionSection data={data} />}
                    Features={<Features data={data as any} />}
                />
            </TabPanel>
            <TabPanel value={value} index={1}></TabPanel>
            <TabPanel value={value} index={2}></TabPanel>
            <TabPanel value={value} index={3}>
                <MatchingCustomersSection />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <PhotosOnly data={data as any}></PhotosOnly>
            </TabPanel>
            <TabPanel value={value} index={5}></TabPanel>
            <TabPanel value={value} index={6}>
                <PropertyLogs />
            </TabPanel>
            <TabPanel value={value} index={7}>
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
