import {
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
    TooltipProps,
    ReferenceLine,
    ReferenceDot,
    ComposedChart,
    Line,
} from "recharts";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetDailyViewsQuery } from "@/services/publicDashboard";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import useResponsive from "@/hooks/useResponsive";
import CustomActiveDot from "./CustomActiveDot";

// Code for Skip Get daily-views endpoint if the chart is not visible
export const useVisibility = (): [
    MutableRefObject<HTMLDivElement | null>,
    boolean,
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

export default function ViewsChart() {
    const { t, i18n } = useTranslation();

    const [ref, isVisible] = useVisibility();

    const { data } = useGetDailyViewsQuery(undefined, {
        pollingInterval: 3000,
        skip: !isVisible, // Disable polling if the chart is not visible
    });

    const chartData = useMemo(() => data?.views || [], [data]);

    const formatHour = (hour: number) => {
        const date = new Date();
        date.setHours(hour, 0, 0, 0);
        const locale = i18n.language === "el" ? "el-GR" : "en-US";

        return date.toLocaleTimeString(locale, {
            hour: "2-digit",
            hour12: true,
        });
    };

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
    const now = new Date();

    const currentDecimalTime = now.getHours() + now.getMinutes() / 60 - 0.5;

    return (
        <div ref={ref}>
            <Stack position="relative">
                <Stack direction="row" alignItems="center" spacing={-1} pb={2}>
                    <Typography variant="h5" fontWeight={600} p={2} pt={1}>
                        {t("Day Views in progress")}:{" "}
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"primary.main"}
                        fontWeight={"bold"}
                        pb={0.5}
                    >
                        {" "}
                        {data?.totalViews ?? 0}
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
                        alt=""
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
                <ComposedChart
                    data={chartData}
                    margin={{ left: 30, right: 30 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        visibility={belowMd ? "hidden" : "visible"}
                        dataKey="hour"
                        tickFormatter={formatHour}
                        type="number"
                        interval={0}
                    />
                    <YAxis dataKey="views" width={20} />

                    <Bar
                        dataKey="views"
                        fill="#3366FF"
                        barSize={71}
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Tooltip cursor={false} content={renderTooltipContent} />
                    {/* Invisible Line component to show the currentDecimalTime ReferenceLine */}
                    <Line
                        dataKey="views"
                        stroke="transparent"
                        dot={false}
                        isAnimationActive={false}
                        xAxisId={0}
                        activeDot={<CustomActiveDot />}
                    />

                    {/* Reference Line */}
                    <ReferenceLine
                        x={currentDecimalTime}
                        stroke="red"
                        strokeWidth={2}
                        isFront
                    />
                    <ReferenceDot
                        x={currentDecimalTime}
                        y={0}
                        r={3}
                        fill="red"
                        stroke="red"
                        isFront
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
