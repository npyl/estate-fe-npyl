import { FC } from "react";
import { ILabel, LabelResourceType } from "src/types/label";
import dynamic from "next/dynamic";
import AvailableLabels from "./AvailableLabels";
const LabelForm = dynamic(() => import("@/ui/LabelForm"));

interface ContentProps {
    resourceId?: number;
    resource: LabelResourceType;

    onCreate?: (id: number) => void;
    onLabelClick: (l: ILabel) => void;

    onClose: VoidFunction;
}

const Content: FC<ContentProps> = ({
    resourceId,
    resource,
    onCreate,
    // ...
    onLabelClick,
    onClose,
}) => (
    <>
        <AvailableLabels
            resource={resource}
            resourceId={resourceId}
            onLabelClick={onLabelClick}
        />

        <LabelForm
            resource={resource}
            resourceId={resourceId}
            onCreate={onCreate}
            onCancel={onClose}
        />
    </>
);

export default Content;
