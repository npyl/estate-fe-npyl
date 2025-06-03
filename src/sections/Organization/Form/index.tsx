import { IOrganization, IOrganizationReq } from "@/types/organization";
import { FC, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Content from "./Content";
import { useCreateOrUpdateOrganizationMutation } from "@/services/organization";
import Actions from "./Actions";

interface OrganizationFormProps {
    organization?: IOrganization;
    onCreate?: (id: number) => void;
    onCancel: VoidFunction;
}

const OrganizationForm: FC<OrganizationFormProps> = ({
    organization,
    onCreate,
    onCancel,
}) => {
    const [createOrUpdate] = useCreateOrUpdateOrganizationMutation();

    const methods = useForm<IOrganizationReq>({
        values: {
            id: organization?.id,
            name: organization?.name || "",
            email: organization?.email || "",
            gemh: organization?.gemh || "",
            phone: organization?.mobilePhone || "",
        },
    });

    const onSubmit = useCallback(
        async (d: IOrganizationReq) => {
            const res = await createOrUpdate(d);
            if ("error" in res) return;

            onCreate?.(res.data);

            onCancel();
        },
        [onCreate, onCancel]
    );

    return (
        <form>
            <FormProvider {...methods}>
                <Content />
                <Actions
                    onCancel={onCancel}
                    onSubmit={methods.handleSubmit(onSubmit)}
                />
            </FormProvider>
        </form>
    );
};

export default OrganizationForm;
