import { IFirmReq } from "@/types/firm";
import { FC, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Content from "./Content";
import { useCreateOrUpdateFirmMutation } from "@/services/firm";
import Actions from "./Actions";

interface FirmFormProps {
    createAssign?: boolean; // true when opened from inside customer for create-assign
    onCreate?: (id: number) => void;
    onCancel: VoidFunction;
}

const FirmForm: FC<FirmFormProps> = ({ createAssign, onCreate, onCancel }) => {
    const [createOrUpdate] = useCreateOrUpdateFirmMutation();

    const methods = useForm<IFirmReq>({
        values: {
            name: "",
            customers: [],
        },
    });

    const onSubmit = useCallback(
        async (d: IFirmReq) => {
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

export default FirmForm;
