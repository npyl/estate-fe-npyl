import FormDialog, { FormDialogProps } from "@/sections/Label/FormDialog";
import { ILabel, LabelResourceType } from "@/types/label";
import useExistingLabels from "@/services/labels/useExistingLabels";
import { FC, useMemo } from "react";

const hasId = (id: number) => (l: ILabel) => id === l.id;

interface EditButtonProps extends Omit<FormDialogProps, "label"> {
    resource: LabelResourceType;
    labelId: number;
}

const EditDialog: FC<EditButtonProps> = ({ resource, labelId, ...props }) => {
    const labels = useExistingLabels(resource);
    const label = useMemo(() => labels.find(hasId(labelId)), [labels, labelId]);
    if (!label) return null;
    return <FormDialog label={label} {...props} />;
};

export default EditDialog;
