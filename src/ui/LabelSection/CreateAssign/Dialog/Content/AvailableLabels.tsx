import { Stack } from "@mui/material";
import { FC, useMemo } from "react";
import Label from "@/components/Label/Label";
import { ILabel, LabelResourceType } from "src/types/label";
import useAssignedLabels from "@/ui/LabelSection/useAssignedLabels";
import useExistingLabels from "./useExistingLabels";

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

    return (
        <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
            {labels.map((label) => (
                <Label
                    key={label.id}
                    color={label.color}
                    name={label.name}
                    onClick={() => onLabelClick(label)}
                    sx={{
                        borderRadius: 7,
                        "&:hover": { cursor: "pointer" },
                    }}
                />
            ))}
        </Stack>
    );
};

export default AvailableLabels;
