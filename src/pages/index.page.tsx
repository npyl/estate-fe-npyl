import { Grid } from "@mui/material";

import type { NextPage } from "next";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import "react-slideshow-image/dist/styles.css";
import { AuthGuard } from "src/components/authentication/auth-guard";
import StyledSlide from "src/components/dashboard/components/Slideshow";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useGetDashboardQuery } from "src/services/dashboard";
import { useAllPropertiesQuery } from "src/services/properties";
import { useProfileQuery } from "src/services/user";
import CardWithIcon from "./dashboard/CardWithIcon";
import SeoIllustration from "./dashboard/SeoIllustration";
import AppConversionRates from "./dashboard/app-conversion-rates";
import AppWelcome from "./dashboard/app-welcome";
import TotalProperties from "./dashboard/total-properties";

const Dashboard: NextPage = () => {
    const { t } = useTranslation();
    const { firstName, lastName } = useProfileQuery().data ?? {};
    const name = `${lastName} ${firstName}`;
    const allProperties = useAllPropertiesQuery().data || [];
    const { data } = useGetDashboardQuery();
    const slideImages = useMemo<{ url: string; code: string }[]>(() => {
        // Sort properties by id in descending order and take the first 10
        const topProperties = [...allProperties]
            .sort((a, b) => b.id - a.id)
            .slice(0, 9);

        return (
            topProperties
                .filter(({ images }) => images?.length > 0 && !!images[0]?.url)
                .map(({ propertyImage, code }) => ({
                    url: propertyImage.url!,
                    code,
                })) || []
        );
    }, [allProperties]);

    return (
        <div style={{ margin: "20px" }}>
            <Grid container spacing={3} mt={1}>
                <Grid item xs={12} md={7}>
                    <AppWelcome
                        title={`Welcome back! \n ${name}`}
                        description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
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
                <Grid item xs={12} md={4}>
                    <StyledSlide arrows={false} images={slideImages} />
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
                        subtitle={"Total Rented Properties"}
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
                                            data?.propertiesDistribution.land ??
                                            0,
                                    },
                                    {
                                        label: t("Other"),
                                        value:
                                            data?.propertiesDistribution
                                                .other ?? 0,
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
        </div>
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
