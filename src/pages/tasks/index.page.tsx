import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAllTasks from "@/sections/Tasks/ViewAll";

export default function KanbanPage() {
    return <ViewAllTasks />;
}

// ----------------------------------------------------

KanbanPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);
