import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    Rectangle,
    TooltipProps,
} from "recharts";
import { Stack } from "@mui/system";
import { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { TTimeFrame } from "@/types/publicDashboard";
import {
    MenuItem,
    Select,
    SelectChangeEvent,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useGetPublicDashboardParentCategoriesQuery } from "@/services/publicDashboard";
import { useTranslation } from "react-i18next";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, parseISO } from "date-fns";

export default function ViewsOfPropertiesChart() {
    const { t } = useTranslation();

    const [timeframe, setTimeframe] = useState<TTimeFrame>("ALL_TIME");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openDateRangePicker, setOpenDateRangePicker] = useState(false);

    const { data: parentCategoriesGet } =
        useGetPublicDashboardParentCategoriesQuery({
            timeframe,
            startDate: startDate
                ? format(new Date(startDate), "yyyy-MM-dd")
                : "",
            endDate: endDate ? format(new Date(endDate), "yyyy-MM-dd") : "",
        });

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) => {
        setTimeframe(e.target.value as TTimeFrame);
        if (e.target.value !== "CUSTOM") {
            setStartDate("");
            setEndDate("");
        }
    };

    const handleDateRangeChange = (ranges: RangeKeyDict) => {
        const { selection } = ranges;
        if (selection.startDate && selection.endDate) {
            setStartDate(selection.startDate.toISOString());
            setEndDate(selection.endDate.toISOString());
        }
    };

    const chartData = useMemo(
        () =>
            parentCategoriesGet?.map(({ date, parentCategories }) => ({
                date,
                All: parentCategories.All ?? 0,
                parentCategory: parentCategories.parentCategory ?? 0,
                Commercial: parentCategories.COMMERCIAL ?? 0,
                Residential: parentCategories.RESIDENTIAL ?? 0,
                Land: parentCategories.LAND ?? 0,
                Other: parentCategories.OTHER ?? 0,
            })) || [],
        [parentCategoriesGet]
    );

    const formatDateTick = (tickItem: string) => {
        const date = new Date(tickItem);
        return timeframe === "WEEK"
            ? date
                  .toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                  })
                  .replace(/,\s*/g, " ") // remove the comma and space
            : date.toLocaleDateString();
    };

    const renderLegendText = (value: string) => {
        return <span>{t(value)}</span>;
    };

    const renderTooltipContent = ({
        active,
        payload,
    }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            const totalViews = payload.reduce(
                (sum, entry) => sum + (entry.value as number),
                0
            );

            return (
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "7px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                >
                    <p style={{ color: "#000", margin: 0, fontWeight: "bold" }}>
                        {t("Property Views")}: {totalViews}
                    </p>
                    <hr style={{ borderColor: "grey" }} />
                    {payload.map((entry) => (
                        <div
                            key={entry.name}
                            style={{
                                color: entry.color,
                                display: "flex",
                                alignItems: "center",
                                marginTop: "5px",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    backgroundColor: entry.color,
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                }}
                            ></span>
                            <span style={{ color: "#000" }}>{`${t(
                                (entry.name as string) || ""
                            )}: ${entry.value}`}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const formatYAxis = (tickItem: number) => {
        return tickItem > 999 ? `${tickItem / 1000}k` : tickItem.toString();
    };

    return (
        <>
            <Stack direction="row" spacing={2} p={1}>
                <Typography variant={"h5"}>{t("Category Views")}</Typography>

                <Select value={timeframe} onChange={handleTimeframeSelect}>
                    <MenuItem value="ALL_TIME">{t("All_Time")}</MenuItem>
                    <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                    <MenuItem value="WEEK">{t("Weekly")}</MenuItem>
                    <MenuItem value="YEAR">{t("Yearly")}</MenuItem>
                    <MenuItem value="DAY">{t("Daily")}</MenuItem>
                    <MenuItem value="CUSTOM">{t("Custom")}</MenuItem>
                </Select>

                {timeframe === "CUSTOM" && (
                    <Button
                        variant="outlined"
                        onClick={() => setOpenDateRangePicker(true)}
                    >
                        {t("Select Date Range")}
                    </Button>
                )}
            </Stack>

            <Dialog
                open={openDateRangePicker}
                onClose={() => setOpenDateRangePicker(false)}
                aria-labelledby="date-range-picker-dialog-title"
            >
                <DialogTitle id="date-range-picker-dialog-title">
                    {t("Select Date Range")}
                </DialogTitle>
                <DialogContent>
                    <DateRangePicker
                        ranges={[
                            {
                                startDate: startDate
                                    ? parseISO(startDate)
                                    : new Date(),
                                endDate: endDate
                                    ? parseISO(endDate)
                                    : new Date(),
                                key: "selection",
                            },
                        ]}
                        onChange={handleDateRangeChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDateRangePicker(false)}>
                        {t("Close")}
                    </Button>
                </DialogActions>
            </Dialog>

            <ResponsiveContainer width="99%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ right: 30, left: 30, bottom: 5 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDateTick}
                        tickMargin={7}
                    />
                    <YAxis width={20} tickFormatter={formatYAxis} />
                    <Tooltip content={renderTooltipContent} />

                    <Legend
                        formatter={renderLegendText}
                        iconType="circle"
                        iconSize={10}
                        verticalAlign="top"
                        align="right"
                        layout="horizontal"
                        wrapperStyle={{ paddingBottom: "20px" }}
                    />

                    <Bar
                        barSize={25}
                        dataKey="Commercial"
                        fill="#A25772"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Residential"
                        fill="#7C93C3"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Land"
                        fill="#9EB8D9"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Other"
                        fill="#6BA8FF"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
