import { SxProps, Theme } from "@mui/material";
import { FC, useMemo } from "react";
import { LabelClassName } from "@/components/Label/Label";
import { ILabel, LabelResourceType } from "src/types/label";
import useAssignedLabels from "@/ui/LabelSection/useAssignedLabels";
import useExistingLabels from "./useExistingLabels";
import Labels from "../../Labels";

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
    const assignedLabels = useAssignedLabels(resource, resourceId);
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

interface AvailableLabelsProps {
    resourceId?: number;
    resource: LabelResourceType;
    onLabelClick: (l: ILabel) => void;
}

const AvailableLabels: FC<AvailableLabelsProps> = ({
    resource,
    resourceId,
    onLabelClick,
}) => {
    const labels = useAvailableLabels(resource, resourceId);
    return <Labels labels={labels} onLabelClick={onLabelClick} sx={LabelsSx} />;
};

export default AvailableLabels;
