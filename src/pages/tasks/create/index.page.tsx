import TasksGuard from "@/components/authentication/tasks-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import ViewAllTasks from "@/sections/Tasks/ViewAll";

export default function CreateTaskPage() {
    return <ViewAllTasks create />;
}

// ----------------------------------------------------

CreateTaskPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>
        <TasksGuard>{page}</TasksGuard>
    </DashboardLayout>
);
