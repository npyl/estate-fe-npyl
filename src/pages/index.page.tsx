import { Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import CardWithIcon from "./dashboard/CardWithIcon";
import TotalProperties from "./dashboard/total-properties";
import AppConversionRates from "./dashboard/app-conversion-rates";

const Dashboard: NextPage = () => {
    return (
        <div style={{ margin: "20px" }}>
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back 👋
            </Typography>
            <Grid container spacing={5} gap={5} mt={1}>
                <Grid xs={2} sm={2} md={1.5} ml={3}>
                    <CardWithIcon
                        title={"1270"}
                        subtitle={"Total Properties"}
                    />
                </Grid>
                <Grid xs={2} sm={2} md={1.5}>
                    <CardWithIcon
                        title={"1130"}
                        subtitle={"Total Active Properties"}
                    />
                </Grid>

                <Grid xs={2} sm={2} md={1.5}>
                    <CardWithIcon
                        title={"765"}
                        subtitle={"Total Sold Properties"}
                    />
                </Grid>
                <Grid xs={2} sm={2} md={1.5}>
                    <CardWithIcon
                        title={"365"}
                        subtitle={"Total Rented Properties"}
                    />
                </Grid>
                <Grid xs={12} md={6} lg={7} ml={3}>
                    <AppConversionRates
                        title="Total Properties per User"
                        subheader=""
                        chart={{
                            series: [
                                { label: "User 1", value: 400 },
                                { label: "User 2", value: 430 },
                                { label: "User 3", value: 448 },
                                { label: "User 4", value: 470 },
                                { label: "User 5", value: 540 },
                                { label: "User 6", value: 580 },
                                { label: "User 7", value: 690 },
                                { label: "User 8", value: 1100 },
                                { label: "User  9", value: 1200 },
                                { label: "User 10", value: 1380 },
                            ],
                        }}
                    />
                </Grid>
                <Grid xs={12} md={6} lg={3}>
                    <TotalProperties
                        title="Total Properties"
                        subheader={"Properties Distribution"}
                        chart={{
                            series: [
                                { label: "Residential", value: 4344 },
                                { label: "Commercial", value: 5435 },
                                { label: "Land", value: 1443 },
                                { label: "Other", value: 4443 },
                            ],
                        }}
                    />
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
