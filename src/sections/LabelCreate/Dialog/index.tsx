import { useTranslation } from "react-i18next";
import { ILabel, LabelResourceType } from "src/types/label";
import Dialog from "@/components/Dialog";
import Content from "./Content";
import { FormProvider, useForm } from "react-hook-form";
import { ILabelForm } from "@/sections/Label/Create/types";
import useExistingLabels from "./useExistingLabels";
import useAssignedLabels from "../useAssignedLabels";

interface AddLabelDialog {
    resourceId?: number;
    variant: LabelResourceType;

    onLabelClick: (l: ILabel) => void;
    onCreate: (id: number) => void;
    onClose: () => void;
}

const AddLabelDialog = ({
    resourceId,
    variant,

    onLabelClick,
    onCreate,
    onClose,
}: AddLabelDialog) => {
    const { t } = useTranslation();

    const assignedLabels = useAssignedLabels(variant, resourceId);
    const existingLabels = useExistingLabels(variant);

    const methods = useForm<ILabelForm>({
        values: {
            name: "",
            color: "#22194d",
            resource: variant,
        },
    });

    return (
        <Dialog
            open
            maxWidth="xs"
            onClose={onClose}
            // ...
            submit
            // ...
            title={t("Add an existing label")}
            content={
                <FormProvider {...methods}>
                    <Content
                        resourceId={resourceId}
                        resource={variant}
                        onCreate={onCreate}
                        // ...
                        existingLabels={existingLabels}
                        assignedLabels={assignedLabels}
                        // ...
                        onLabelClick={onLabelClick}
                    />
                </FormProvider>
            }
        />
    );
};

export default AddLabelDialog;
