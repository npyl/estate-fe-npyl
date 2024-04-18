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
            <Stack
                direction="row"
                alignItems={"flex-start"}
                position="relative"
            >
                <Stack direction="column" spacing={-1.5}>
                    <Typography variant="body1" p={1}>
                        {currentDate}
                    </Typography>
                    <Typography variant="body1" p={1}>
                        {t("Property Views")} : {data?.totalViews ?? 0}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.main",
                    }}
                >
                    <img
                        src="/static/liveicon.gif"
                        style={{
                            display: "block",
                            paddingTop: "auto",
                            width: "35px",
                        }}
                    />
                    <Typography paddingRight={2} variant="body1">
                        LIVE
                    </Typography>
                </Stack>
            </Stack>
            <ResponsiveContainer height={300}>
                <BarChart height={300} data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="hour"
                        tickFormatter={(tick) => {
                            const date = new Date();
                            date.setHours(tick);
                            return date.toLocaleTimeString([], {
                                hour: "2-digit",
                                hour12: false,
                            });
                        }}
                        interval={2}
                    />
                    <YAxis dataKey="views" width={20} />
                    <Tooltip
                        cursor={<StyledCursor />}
                        content={({ payload }) => {
                            if (payload?.length) {
                                const date = new Date();
                                date.setHours(payload[0].payload.hour);
                                const timeString = date.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    hour12: false,
                                });

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
                                            width: "auto",
                                            height: "auto",
                                            textAlign: "center",
                                            paddingLeft: "5px",
                                            paddingRight: "5px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                marginTop: "5px",
                                            }}
                                        >
                                            <b>Time :</b> {timeString}:00
                                        </p>
                                        <hr
                                            style={{
                                                borderColor: "grey",
                                                width: "100%",
                                            }}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#3366FF",
                                                    marginRight: "5px",
                                                }}
                                            ></div>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                <b>Views:</b> {payload[0].value}
                                            </p>
                                        </div>
                                    </Box>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar
                        dataKey="views"
                        fill="#3366FF"
                        barSize={50}
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
