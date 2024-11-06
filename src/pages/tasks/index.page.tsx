// @mui
import { Box, Container } from "@mui/material";
// layouts
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import Bar from "@/sections/Tasks/Bar";
import ParamLooker from "@/sections/Tasks/ParamLooker";
import { FiltersProvider } from "@/sections/Tasks/filters";
import Content from "@/sections/Tasks/ViewAll";

export default function KanbanPage() {
    return (
        <>
            <FiltersProvider>
                <Box position="relative" mt={2}>
                    <Bar />

                    <Container maxWidth="xl">
                        <Content />
                    </Container>
                </Box>
            </FiltersProvider>

            {/* Handle search params */}
            <ParamLooker />
        </>
    );
}

// ----------------------------------------------------

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);
