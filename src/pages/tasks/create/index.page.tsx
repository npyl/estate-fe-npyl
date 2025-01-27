import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAllTasks from "@/sections/Tasks/ViewAll";

export default function CreateTaskPage() {
    return <ViewAllTasks create />;
}

// ----------------------------------------------------

CreateTaskPage.getLayout = (page: React.ReactElement) => (
    <DashboardLayout>{page}</DashboardLayout>
);
