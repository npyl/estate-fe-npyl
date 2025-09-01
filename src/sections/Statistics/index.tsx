/* eslint-disable react/jsx-key */

import { Paper, Stack } from "@mui/material";
import ViewsChart from "./LiveViews";
import PropertyViewLineChart from "./Views";
import CategoryViewsBarChart from "./CategoryViews";
import PopularProperties from "./Popular";
import getIndexMapped from "@/utils/getIndexMapped";

const CHARTS = getIndexMapped([
    <ViewsChart />,
    <PropertyViewLineChart />,
    <CategoryViewsBarChart />,
    <PopularProperties />,
]);

const StatisticsPage = () => (
    <Stack spacing={2}>
        {CHARTS.map((C, i) => (
            <Paper sx={{ p: 1 }} key={C.id}>
                {C.item}
            </Paper>
        ))}
    </Stack>
);

export default StatisticsPage;
