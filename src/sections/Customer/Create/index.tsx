import { useCallback } from "react";
import { useRouter } from "next/router";
import Form from "@/sections/Customer/Form";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import { ICustomerPOST } from "@/types/customer";

const CreateCustomer = () => {
    const router = useRouter();

    const [create, { isError, isLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(
        (body: ICustomerPOST) =>
            create(body)
                .unwrap()
                .then((id) => router.push(`/customer/${id}`)),
        []
    );

    const handleCancel = useCallback(() => router.back(), []);

    return (
        <Form
            isLoading={isLoading}
            isError={isError}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

export default CreateCustomer;
