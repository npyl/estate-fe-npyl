import { SxProps, Theme } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { LabelClassName } from "@/components/Label/Label";
import { ILabel, ILabelPOST, LabelResourceType } from "@/types/label";
import useAssignedLabels from "@/ui/Label/Section/useAssignedLabels";
import useExistingLabels from "../../../useExistingLabels";
import Labels from "../../Labels";
import useInvalidateTags from "@/ui/Label/Form/useInvalidateTags";
import { useAssignLabelToResourceIdMutation } from "@/services/labels";
import { useSettings } from "@/ui/Label/Section/Context";

const areIdsEqual =
    (existingId: number) =>
    ({ id: assignedId }: ILabel) =>
        existingId === assignedId;

const nonAssigned =
    (assignedLabels: ILabel[]) =>
    ({ id: existingId }: ILabel) =>
        !assignedLabels.find(areIdsEqual(existingId));

const useAvailableLabels = (
    resource: LabelResourceType,
    resourceId: number | undefined
) => {
    const assignedLabels = useAssignedLabels(resourceId, resource, []);
    const existingLabels = useExistingLabels(resource);
    return useMemo(
        () => existingLabels.filter(nonAssigned(assignedLabels)),
        [existingLabels, assignedLabels]
    );
};

const LabelsSx: SxProps<Theme> = {
    [`.${LabelClassName}`]: {
        cursor: "pointer",
    },
};

const useOnLabelClick = (resource: LabelResourceType, resourceId?: number) => {
    const { isControlled, onLabelClick: _onLabelClick } = useSettings();

    const { invalidateTags } = useInvalidateTags(resource);
    const [assignLabel] = useAssignLabelToResourceIdMutation();
    return useCallback(
        async (body: ILabelPOST) => {
            if (isControlled) {
                _onLabelClick?.(body.id!);
            } else {
                const res = await assignLabel({
                    resource,
                    resourceId: resourceId!,
                    body,
                });
                if ("error" in res) return;
                invalidateTags();
            }
        },
        [isControlled, _onLabelClick, resource, resourceId, invalidateTags]
    );
};

interface AvailableLabelsProps {
    resourceId?: number;
    resource: LabelResourceType;
}

const AvailableLabels: FC<AvailableLabelsProps> = ({
    resource,
    resourceId,
}) => {
    const onLabelClick = useOnLabelClick(resource, resourceId);
    const labels = useAvailableLabels(resource, resourceId);
    return <Labels labels={labels} onLabelClick={onLabelClick} sx={LabelsSx} />;
};

export default AvailableLabels;
