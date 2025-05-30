import { IOrganizationReq } from "@/types/organization";
import { FC, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Content from "./Content";
import { useCreateOrUpdateOrganizationMutation } from "@/services/organization";
import Actions from "./Actions";

interface OrganizationFormProps {
    createAssign?: boolean; // true when opened from inside customer for create-assign
    onCreate?: (id: number) => void;
    onCancel: VoidFunction;
}

const OrganizationForm: FC<OrganizationFormProps> = ({
    createAssign,
    onCreate,
    onCancel,
}) => {
    const [createOrUpdate] = useCreateOrUpdateOrganizationMutation();

    const methods = useForm<IOrganizationReq>({
        values: {
            name: "",
            customers: [],
        },
    });

    const onSubmit = useCallback(
        async (d: IOrganizationReq) => {
            const res = await createOrUpdate(d);
            if ("error" in res) return;

            onCreate?.(res.data);
        },
        [onCreate]
    );

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <Content createAssign={createAssign} />
                <Actions onCancel={onCancel} />
            </FormProvider>
        </form>
    );
};

export default OrganizationForm;
