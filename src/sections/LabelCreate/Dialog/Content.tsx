import { Stack } from "@mui/material";
import { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel, LabelResourceType } from "src/types/label";
import dynamic from "next/dynamic";
const LabelForm = dynamic(() => import("@/sections/LabelCreate/Form"));

interface ContentProps {
    resourceId?: number;
    resource: LabelResourceType;
    onCreate: (id: number) => void;

    existingLabels: ILabel[];
    assignedLabels: ILabel[];
    onLabelClick: (l: ILabel) => void;
}

const Content: FC<ContentProps> = ({
    resourceId,
    resource,
    onCreate,
    // ...
    existingLabels,
    assignedLabels,
    // ...
    onLabelClick,
}) => {
    const isEdit = Boolean(resourceId);

    return (
        <>
            <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={1}>
                {existingLabels.map((label, index) => {
                    const isAssigned = assignedLabels.some(
                        (assignedLabel) => assignedLabel.name === label.name
                    );

                    return (
                        <Label
                            key={index}
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

            {isEdit ? (
                <LabelForm
                    resource={resource}
                    resourceId={resourceId}
                    onCreate={onCreate}
                />
            ) : null}
        </>
    );
};

export default Content;
