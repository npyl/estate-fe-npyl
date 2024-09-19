import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
    TooltipProps,
} from "recharts";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetDailyViewsQuery } from "@/services/publicDashboard";
import { StyledCursor } from "./styled";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import useResponsive from "@/hooks/useResponsive";

// Code for Skip Get daily-views endpoint if the chart is not visible
export const useVisibility = (): [
    MutableRefObject<HTMLDivElement | null>,
    boolean
] => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return [ref, isVisible];
};

const formatHour = (hour: number) => {
    const date = new Date();
    date.setHours(hour);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        hour12: true,
    });
};

export default function ViewsChart() {
    const { t, i18n } = useTranslation();

    const [ref, isVisible] = useVisibility();

    const { data } = useGetDailyViewsQuery(undefined, {
        pollingInterval: 3000,
        skip: !isVisible, // Disable polling if the chart is not visible
    });

    const chartData = useMemo(() => data?.views || [], [data]);

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

    const renderTooltipContent = ({
        payload,
    }: TooltipProps<ValueType, NameType>) => {
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
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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
                        <b>{t("Time")} :</b> {timeString}
                        :00
                    </p>
                    <hr
                        style={{
                            borderColor: "#D3D3D3",
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
                            <b>{t("Views")}:</b> {payload[0].value}
                        </p>
                    </div>
                </Box>
            );
        }
        return null;
    };

    const belowMd = useResponsive("down", "md");

    return (
        <div ref={ref}>
            <Stack position="relative">
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
                <BarChart data={chartData} margin={{ left: 30, right: 30 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        visibility={belowMd ? "hidden" : "visible"}
                        dataKey="hour"
                        tickFormatter={formatHour}
                        interval={2}
                    />
                    <YAxis dataKey="views" width={20} />
                    <Tooltip
                        cursor={<StyledCursor />}
                        content={renderTooltipContent}
                    />
                    <Bar
                        dataKey="views"
                        fill="#3366FF"
                        barSize={50}
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
