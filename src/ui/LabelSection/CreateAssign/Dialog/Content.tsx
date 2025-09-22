import { Stack } from "@mui/material";
import { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel, LabelResourceType } from "src/types/label";
import dynamic from "next/dynamic";
import useAssignedLabels from "@/ui/LabelSection/useAssignedLabels";
import useExistingLabels from "./useExistingLabels";
const LabelForm = dynamic(() => import("@/ui/LabelForm"));

interface ContentProps {
    resourceId?: number;
    resource: LabelResourceType;
    onCreate?: (id: number) => void;

    onLabelClick: (l: ILabel) => void;

    onClose: () => void;
}

const Content: FC<ContentProps> = ({
    resourceId,
    resource,
    onCreate,
    // ...
    onLabelClick,
    onClose,
}) => {
    const assignedLabels = useAssignedLabels(resource, resourceId);
    const existingLabels = useExistingLabels(resource);

    return (
        <>
            <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={1}>
                {existingLabels.map((label) => {
                    const isAssigned = assignedLabels.some(
                        (assignedLabel) => assignedLabel.name === label.name
                    );

                    return (
                        <Label
                            key={label.id}
                            color={label.color}
                            name={label.name}
                            onClick={
                                isAssigned
                                    ? undefined
                                    : () => onLabelClick(label)
                            }
                            opacity={isAssigned ? 0.4 : 1} // Pass opacity directly here
                            sx={{
                                borderRadius: 7,
                                "&:hover": isAssigned
                                    ? undefined
                                    : { cursor: "pointer" },
                            }}
                        />
                    );
                })}
            </Stack>

            <LabelForm
                resource={resource}
                resourceId={resourceId}
                onCreate={onCreate}
                onCancel={onClose}
            />
        </>
    );
};

export default Content;
