import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreatePropertyMutation } from "src/services/properties";
import { useRouter } from "next/router";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import Form from "./Form";

const CreatePropertyPage: NextPage = () => {
    const router = useRouter();

    const [
        create,
        { isSuccess, isLoading: isCreateLoading, data: createdPropertyId },
    ] = useCreatePropertyMutation();

    const handleUpload = (parentCategory: string, category: string) => {
        if (!category || !parentCategory) return;

        // perform POST
        create({ parentCategory, category });
    };

    // redirect on success
    isSuccess &&
        createdPropertyId &&
        router.push(`/property/edit/${createdPropertyId}`);

    return (
        <>
            <Form performUpload={handleUpload} />

            {
                // loading indicator (incase POST request is taking alot of time)
                isCreateLoading && <LogoProgressIndicator />
            }
        </>
    );
};

CreatePropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreatePropertyPage;
