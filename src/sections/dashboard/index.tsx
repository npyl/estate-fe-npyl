import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { useGetDashboardQuery } from "src/services/dashboard";
import { useGetProfileQuery } from "src/services/user";
import CardWithIcon from "./CardWithIcon";
import AppConversionRates from "./app-conversion-rates";
import TotalProperties from "./total-properties";
import dynamic from "next/dynamic";
import { FC, RefObject, useRef } from "react";
import Tasks from "./Tasks";
import useStickyPoint from "./useStickyPoint";
const SimpleCalendar = dynamic(() => import("./SimpleCalendar"));

// ----------------------------------------------------------------------

interface StickyCalendarProps {
    startRef: RefObject<HTMLDivElement>;
}

const StickyCalendar: FC<StickyCalendarProps> = ({ startRef }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    useStickyPoint(startRef, targetRef);

    return (
        <Box
            width={{ xs: "100%", md: "50%" }}
            height="max-content"
            position={{ xs: "initial", md: "sticky" }}
            left="70%"
            zIndex={1}
            ref={targetRef}
        >
            <SimpleCalendar />
        </Box>
    );
};

// ----------------------------------------------------------------------

const Title = () => {
    const { t } = useTranslation();
    const { firstName, lastName } = useGetProfileQuery().data ?? {};

    const name = `${lastName} ${firstName}`;

    return (
        <Stack spacing={0.2}>
            <Typography variant="h5">
                {t("Hello")}, {name}
            </Typography>

            <Typography color="text.secondary">{t("_WELCOME_")}</Typography>
        </Stack>
    );
};

// ----------------------------------------------------------------------

const Stats = () => {
    const { t } = useTranslation();

    const { data } = useGetDashboardQuery();

    return (
        <Grid
            container
            width={{ xs: "100%", md: "50%" }}
            spacing={1}
            maxHeight={{ xs: "100%", md: "calc(100vh - 178px)" }}
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
                />
            </Grid>

            <Grid xs={12}>
                <AppConversionRates
                    title={t("Total Properties per User")}
                    subheader=""
                />
            </Grid>
        </Grid>
    );
};

// ----------------------------------------------------------------------

const Dashboard = () => {
    const startRef = useRef<HTMLDivElement>(null);

    return (
        <Stack spacing={1}>
            <Stack position="relative" width={1} height={1} spacing={1}>
                <Title />

                <div ref={startRef} />

                <Stats />

                <StickyCalendar startRef={startRef} />
            </Stack>

            <Tasks />
        </Stack>
    );
};

export default Dashboard;
