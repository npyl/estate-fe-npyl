import { Box, Grid } from "@mui/material";

import type { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useGetDashboardQuery } from "src/services/dashboard";
import { useGetProfileQuery } from "src/services/user";
import CardWithIcon from "./dashboard/CardWithIcon";
import SeoIllustration from "./dashboard/SeoIllustration";
import AppConversionRates from "./dashboard/app-conversion-rates";
import AppWelcome from "./dashboard/app-welcome";
import TotalProperties from "./dashboard/total-properties";
import dynamic from "next/dynamic";
const SimpleCalendar = dynamic(() => import("./dashboard/SimpleCalendar"));

const Dashboard: NextPage = () => {
    const { t } = useTranslation();
    const { firstName, lastName } = useGetProfileQuery().data ?? {};

    const name = `${lastName} ${firstName}`;

    const { data } = useGetDashboardQuery();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
                <AppWelcome
                    title={`${t("Welcome back")} \n ${name}!`}
                    img={
                        <SeoIllustration
                            sx={{
                                p: 3,
                                width: 360,
                                margin: { xs: "auto", md: "inherit" },
                            }}
                        />
                    }
                />
            </Grid>
            <Grid item xs={12} md={7}>
                <SimpleCalendar />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <CardWithIcon
                    title={data?.totalProperties.toString() ?? ""}
                    subtitle={t("Total Properties")}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <CardWithIcon
                    title={data?.totalActiveProperties.toString() ?? ""}
                    subtitle={t("Total Active Properties")}
                    info={
                        t(
                            "The active properties are published in public sites."
                        ) as string
                    }
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <CardWithIcon
                    title={data?.totalSoldProperties.toString() ?? ""}
                    subtitle={t("Total Sold Properties")}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <CardWithIcon
                    title={data?.totalRentedProperties.toString() ?? ""}
                    subtitle={t("Total Rented Properties")}
                />
            </Grid>
            <Grid item container spacing={3} xs={12}>
                <Grid item xs={12} sm={6}>
                    <TotalProperties
                        title={t("Total Properties")}
                        subheader={t("Properties Distribution")}
                        chart={{
                            series: [
                                {
                                    label: t("Residential"),
                                    value:
                                        data?.propertiesDistribution
                                            .residential ?? 0,
                                },
                                {
                                    label: t("Commercial"),
                                    value:
                                        data?.propertiesDistribution
                                            .commercial ?? 0,
                                },
                                {
                                    label: t("Land"),
                                    value:
                                        data?.propertiesDistribution.land ?? 0,
                                },
                                {
                                    label: t("Other"),
                                    value:
                                        data?.propertiesDistribution.other ?? 0,
                                },
                            ],
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppConversionRates
                        title={t("Total Properties per User")}
                        subheader=""
                        chart={{
                            series:
                                data?.propertiesPerUserList.map((e) => ({
                                    label: e.user,
                                    value: e.properties,
                                })) ?? [],
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

Dashboard.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Dashboard;
