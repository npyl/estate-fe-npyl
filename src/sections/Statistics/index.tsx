import { Paper, Stack } from "@mui/material";
import ViewsChart from "./LiveViews";
import PropertyViewLineChart from "./Views";
import CategoryViewsBarChart from "./CategoryViews";
import PopularProperties from "./Popular";

const CHARTS = [
    <ViewsChart key="ViewsChart" />,
    <PropertyViewLineChart key="PropertyViewChart" />,
    <CategoryViewsBarChart key="CategoryViewsBarChart" />,
    <PopularProperties key="PopularPropertiesChart" />,
];

const StatisticsPage = () => (
    <Stack spacing={2}>
        {CHARTS.map((C, i) => (
            <Paper sx={{ p: 1 }} key={i}>
                {C}
            </Paper>
        ))}
    </Stack>
);

export default StatisticsPage;
