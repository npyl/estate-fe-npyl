import CreateAssign, { CreateAssignProps } from "./CreateAssign";
import useAssignedLabels from "./useAssignedLabels";
import { FC } from "react";

interface LabelSectionProps extends Omit<CreateAssignProps, "assignedLabels"> {
    // --------------------- Controlled Usage Start ---------------------
    assignedLabels?: number[];
    onLabelClick?: (id: number) => void;
    onLabelRemove?: (id: number) => void;
    // --------------------- Controlled Usage End ---------------------
}

const LabelCreate: FC<LabelSectionProps> = ({
    assignedLabels: _assignedLabels = [],
    ...props
}) => {
    const assignedLabels = useAssignedLabels(
        props.resourceId,
        props.variant,
        _assignedLabels
    );
    return <CreateAssign assignedLabels={assignedLabels} {...props} />;
};

export type { LabelSectionProps };
export default LabelCreate;
