import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";
import { useGetDashboardQuery } from "src/services/dashboard";
import { useGetProfileQuery } from "src/services/user";
import CardWithIcon from "./CardWithIcon";
import AppConversionRates from "./app-conversion-rates";
import TotalProperties from "./total-properties";
import dynamic from "next/dynamic";
const SimpleCalendar = dynamic(() => import("./SimpleCalendar"));

const Dashboard = () => {
    const { t } = useTranslation();
    const { firstName, lastName } = useGetProfileQuery().data ?? {};

    const name = `${lastName} ${firstName}`;

    const { data } = useGetDashboardQuery();

    return (
        <Stack width={1}>
            <Typography>{name}</Typography>

            <Grid
                container
                width="50%"
                spacing={1}
                maxHeight="calc(100vh - 178px)"
            >
                <Grid xs={12} sm={6}>
                    <CardWithIcon
                        title={data?.totalProperties.toString() ?? ""}
                        subtitle={t("Total Properties")}
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <CardWithIcon
                        title={data?.totalSoldProperties.toString() ?? ""}
                        subtitle={t("Total Sold Properties")}
                    />
                </Grid>
                <Grid xs={12} sm={6}>
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
                <Grid xs={12} sm={6}>
                    <CardWithIcon
                        title={data?.totalRentedProperties.toString() ?? ""}
                        subtitle={t("Total Rented Properties")}
                    />
                </Grid>

                <Grid xs={12}>
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

                <Grid xs={12}>
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

            <Box
                width="50%"
                position="sticky"
                top={73}
                left="50%"
                zIndex={1000}
            >
                <SimpleCalendar />
            </Box>
        </Stack>
    );
};

export default Dashboard;
