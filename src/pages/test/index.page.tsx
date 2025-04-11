import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import RHFEditor from "@/components/hook-form/RHFEditor";
import { NextPage } from "next";
import { FormProvider, useForm } from "react-hook-form";

const Test: NextPage = () => {
    const methods = useForm({
        values: {
            test: "",
        },
    });

    return (
        <form>
            <FormProvider {...methods}>
                <RHFEditor name="test" />
            </FormProvider>
        </form>
    );
};

Test.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Test;
