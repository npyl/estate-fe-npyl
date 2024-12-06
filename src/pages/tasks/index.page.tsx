import Stack from "@mui/material/Stack";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Bar from "@/sections/Tasks/Bar";
import ParamLooker from "@/sections/Tasks/ParamLooker";
import { FiltersProvider } from "@/sections/Tasks/filters";
import Content from "@/sections/Tasks/ViewAll";
import { useCallback, useState } from "react";
import { TMode } from "@/sections/Tasks/types";

export default function KanbanPage() {
    const [mode, setMode] = useState<TMode>("board");

    const toggleMode = useCallback(
        () => setMode((old) => (old === "board" ? "list" : "board")),
        []
    );

    return (
        <>
            <FiltersProvider>
                <Stack spacing={1}>
                    <Bar mode={mode} onToggleMode={toggleMode} />
                    <Content mode={mode} />
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
