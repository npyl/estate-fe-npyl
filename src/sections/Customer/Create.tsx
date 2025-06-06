import { FC, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import Form from "@/sections/Customer/Form";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import { ICustomer, ICustomerPOST } from "@/types/customer";

const useB2BEmptyCustomer = (b2b: boolean) =>
    useMemo(() => ({ b2b }) as ICustomer, [b2b]);

interface Props {
    b2b?: boolean;
}

const CreateCustomer: FC<Props> = ({ b2b = false }) => {
    const router = useRouter();

    const redirectId = useRef(-1);
    const savedB2B = useRef(false);

    const emptyCustomer = useB2BEmptyCustomer(b2b);

    const [create, { isError, isLoading }] =
        useCreateOrUpdateCustomerMutation();

    const handleSave = useCallback(async (body: ICustomerPOST) => {
        const res = await create(body);
        if (!("error" in res)) {
            redirectId.current = res.data;
            savedB2B.current = Boolean(body.b2b);
        }
        return res;
    }, []);

    const onSaveSuccess = useCallback(() => {
        const baseUrl = savedB2B.current ? "/b2b" : "/customer";
        router.push(`${baseUrl}/${redirectId.current}`);
    }, []);

    const handleCancel = useCallback(() => router.back(), []);

    return (
        <Form
            customer={emptyCustomer}
            isLoading={isLoading}
            isError={isError}
            onSave={handleSave}
            onSaveSuccess={onSaveSuccess}
            onCancel={handleCancel}
        />
    );
};

export default CreateCustomer;
