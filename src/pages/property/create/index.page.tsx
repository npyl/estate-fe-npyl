import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreatePropertyMutation } from "src/services/properties";
import { useRouter } from "next/router";
import Form from "./Form";

const CreatePropertyPage: NextPage = () => {
    const router = useRouter();

    const [create, { isError, isLoading }] = useCreatePropertyMutation();

    const handleUpload = (parentCategory: string, category: string) =>
        category &&
        parentCategory &&
        // perform POST
        create({ parentCategory, category }).then(
            (res) => "data" in res && router.push(`/property/edit/${res.data}`)
        );

    return (
        <Form
            isLoading={isLoading}
            isError={isError}
            performCreate={handleUpload}
        />
    );
};

CreatePropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreatePropertyPage;
