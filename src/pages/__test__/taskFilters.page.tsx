import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { FiltersProvider } from "@/sections/Tasks/filters";
import { NextPage } from "next";
import Tester from "@/sections/__test__/TaskFilters";

// INFO: prevent from showing up on production
export const getStaticProps = async () => {
    if (process.env.NODE_ENV === "production") {
        return { notFound: true };
    }
    return { props: {} };
};

const TestComponent: NextPage = () => <Tester />;

TestComponent.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <FiltersProvider>{page}</FiltersProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default TestComponent;
