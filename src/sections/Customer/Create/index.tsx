import { FC, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Form from "@/sections/Customer/Form";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import { ICustomerPOST } from "@/types/customer";

interface Props {
    b2b?: boolean;
}

const CreateCustomer: FC<Props> = ({ b2b }) => {
    const router = useRouter();
    const redirectId = useRef(-1);

    const [create, { isError, isLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(async (body: ICustomerPOST) => {
        const res = await create(body);
        if ("error" in res) return res;

        redirectId.current = res.data;
        return res;
    }, []);

    const onSaveSuccess = useCallback(() => {
        router.push(`/customer/${redirectId.current}`);
    }, []);

    const handleCancel = useCallback(() => router.back(), []);

    return (
        <Form
            b2b={b2b}
            isLoading={isLoading}
            isError={isError}
            onSave={handleSave}
            onSaveSuccess={onSaveSuccess}
            onCancel={handleCancel}
        />
    );
};

export default CreateCustomer;
