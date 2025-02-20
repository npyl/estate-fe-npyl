import { useCreatePropertyMutation } from "src/services/properties";
import { useRouter } from "next/router";
import Form from "./Form";
import { useCallback } from "react";

const PropertyCreate = () => {
    const router = useRouter();

    const [create, { isError, isLoading }] = useCreatePropertyMutation();

    const handleUpload = useCallback(
        async (parentCategory: string, category: string) => {
            if (!category || !parentCategory) return;

            const res = await create({ parentCategory, category });
            if ("error" in res) return;

            router.push(`/property/edit/${res.data}`);
        },
        []
    );

    return (
        <Form
            isLoading={isLoading}
            isError={isError}
            performCreate={handleUpload}
        />
    );
};

export default PropertyCreate;
