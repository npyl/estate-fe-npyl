import { useDeleteLabelForResourceIdMutation } from "@/services/labels";
import useInvalidateTags from "@/ui/LabelForm/useInvalidateTags";
import { FC, useCallback } from "react";
import Labels from "./Labels";
import isFalsy from "@/utils/isFalsy";
import { ILabel, LabelResourceType } from "@/types/label";

interface RemovableLabelsProps {
    assignedLabels: ILabel[];
    resource: LabelResourceType;
    resourceId?: number; // > 0 valid, undefined invalid
    disabled?: boolean;
}

const RemovableLabels: FC<RemovableLabelsProps> = ({
    resource,
    resourceId,
    assignedLabels,
    disabled,
}) => {
    const [deleteLabel, { isLoading }] = useDeleteLabelForResourceIdMutation();
    const { invalidateTags } = useInvalidateTags(resource);
    const onLabelRemove = useCallback(
        async (labelId: number) => {
            if (isFalsy(resourceId)) return;
            const res = await deleteLabel({
                resource,
                resourceId: resourceId!,
                labelId,
            });
            if ("error" in res) return;
            invalidateTags();
        },
        [resource, resourceId, invalidateTags]
    );

    return (
        <Labels
            labels={assignedLabels}
            disabled={disabled || isLoading}
            onLabelRemove={onLabelRemove}
        />
    );
};

export default RemovableLabels;
