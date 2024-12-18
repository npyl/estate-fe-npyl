import { useTranslation } from "react-i18next";
import { ILabel, LabelResourceType } from "src/types/label";
import Dialog from "@/components/Dialog";
import Content from "./Content";
import { FormProvider, useForm } from "react-hook-form";
import { ILabelForm } from "@/sections/Label/Create/types";
import { useCreateLabelForResourceMutation } from "@/services/labels";
import { useCallback } from "react";

interface AddLabelDialog {
    variant: LabelResourceType;

    existingLabels: ILabel[];
    assignedLabels: ILabel[];

    onLabelClick: (l: ILabel) => void;
    onCreate: (id: number) => void;
    onClose: () => void;
}

const AddLabelDialog = ({
    variant,

    existingLabels,
    assignedLabels,

    onLabelClick,
    onCreate,
    onClose,
}: AddLabelDialog) => {
    const { t } = useTranslation();

    // const title = useMemo(
    //     () =>
    //         variant === "property"
    //             ? t("Property Labels")
    //             : variant === "customer"
    //             ? t("Customer Labels")
    //             : t("Document Labels"),
    //     [t]
    // );

    const methods = useForm<ILabelForm>({
        values: {
            name: "",
            color: "#22194d",
            resource: variant,
        },
    });

    const [createLabel] = useCreateLabelForResourceMutation();

    const handleSubmit = useCallback(
        async ({ resource: _0, resourceId: _, ...body }: ILabelForm) => {
            const res = await createLabel({ resource: variant, body });
            if (res && "error" in res) return;
            onCreate?.(res.data);
            onClose();
        },
        []
    );

    return (
        <Dialog
            open
            maxWidth="xs"
            onClose={onClose}
            // ...
            submit
            onSubmit={methods.handleSubmit(handleSubmit)}
            title={t("Add an existing label")}
            content={
                <FormProvider {...methods}>
                    <Content
                        existingLabels={existingLabels}
                        assignedLabels={assignedLabels}
                        onLabelClick={onLabelClick}
                    />
                </FormProvider>
            }
        />
    );
};

export default AddLabelDialog;
