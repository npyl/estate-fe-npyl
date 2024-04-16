import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
} from "recharts";
import { t } from "i18next";
import { useMemo } from "react";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Live as LiveIcon } from "@/icons/live";
import { SpaceBetween } from "@/components/styled";
import { useGetDailyViewsQuery } from "@/services/publicDashboard";
import { StyledCursor } from "./styled";

const today = new Date();

export default function ViewsChart() {
    const { data } = useGetDailyViewsQuery(undefined, {
        pollingInterval: 3000,
    });

    const chartData = useMemo(() => data?.views || [], [data]);

    const { i18n } = useTranslation();

    const currentDate = useMemo(
        () =>
            new Date().toLocaleDateString(
                i18n.language === "el" ? "el-GR" : "en-US",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                }
            ),
        [i18n.language]
    );

    return (
        <>
            <SpaceBetween alignItems={"flex-start"}>
                <Stack direction="column" spacing={-1.5}>
                    <Typography variant="body1" p={1} sx={{ top: 0, left: 0 }}>
                        {currentDate}
                    </Typography>
                    <Typography variant="body1" p={1} sx={{ top: 0, right: 0 }}>
                        {t("Property Views")} : {data?.totalViews ?? 0}
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    p={1}
                    sx={{
                        top: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "justify-content",
                        color: "primary.main",
                    }}
                >
                    <LiveIcon />
                    <Box pl={1}>LIVE</Box>
                </Typography>
            </SpaceBetween>
            <Box p={1}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="hour"
                            tickFormatter={(tick) => {
                                return `${tick}:00`;
                            }}
                        />
                        <YAxis dataKey="views" />
                        <Tooltip
                            cursor={<StyledCursor />}
                            content={({ payload }) => {
                                if (payload?.length) {
                                    const date = new Date();
                                    date.setHours(payload[0].payload.hour);
                                    const timeString = date.toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    );

                                    return (
                                        <Box
                                            sx={{
                                                background: "white",

                                                borderRadius: "5px",
                                                boxShadow:
                                                    "0 0 10px rgba(0, 0, 0, 0.1)",
                                                border: "1px solid #ccc",
                                                color: "black",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "100px",
                                                height: "90px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <p>{timeString}</p>
                                            <p>{`Views: ${payload[0].value}`}</p>
                                        </Box>
                                    );
                                }

                                return null;
                            }}
                        />
                        ;
                        <Bar
                            dataKey="views"
                            fill="#3366FF"
                            barSize={30}
                            shape={<Rectangle radius={[10, 10, 0, 0]} />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}
