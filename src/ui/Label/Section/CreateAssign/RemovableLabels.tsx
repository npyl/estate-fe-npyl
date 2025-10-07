import { useDeleteLabelForResourceIdMutation } from "@/services/labels";
import useInvalidateTags from "@/services/labels/useInvalidateTags";
import { FC, useCallback } from "react";
import Labels from "./Labels";
import { ILabel, LabelResourceType } from "@/types/label";
import { useSettings } from "../Context";
import { InvalidateTagsMetadata } from "@/services/labels/types";

interface RemovableLabelsProps {
    assignedLabels: ILabel[];
    resource: LabelResourceType;
    resourceId?: number; // > 0 valid, undefined invalid
    disabled?: boolean;
    meta: InvalidateTagsMetadata;
}

const RemovableLabels: FC<RemovableLabelsProps> = ({
    resource,
    resourceId,
    assignedLabels,
    disabled,
    meta,
}) => {
    const { isControlled, onLabelRemove: _onLabelRemove } = useSettings();

    const [deleteLabel, { isLoading }] = useDeleteLabelForResourceIdMutation();
    const { invalidateTags } = useInvalidateTags(meta);
    const onLabelRemove = useCallback(
        async (labelId: number) => {
            if (isControlled) {
                _onLabelRemove?.(labelId);
            } else {
                const res = await deleteLabel({
                    resource,
                    resourceId: resourceId!,
                    labelId,
                });
                if ("error" in res) return;
                invalidateTags(resource);
            }
        },
        [isControlled, resource, resourceId, invalidateTags, _onLabelRemove]
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
