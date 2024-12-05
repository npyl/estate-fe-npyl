import Stack from "@mui/material/Stack";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Bar from "@/sections/Tasks/Bar";
import ParamLooker from "@/sections/Tasks/ParamLooker";
import { FiltersProvider } from "@/sections/Tasks/filters";
import Content from "@/sections/Tasks/ViewAll";

export default function KanbanPage() {
    return (
        <>
            <FiltersProvider>
                <Stack position="relative" spacing={1}>
                    <Bar />
                    <Content />
                </Stack>
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
