import { ControllerRenderProps, FieldValues } from "react-hook-form";
import LabelSection, {
    LabelSectionProps as PPLabelSectionProps,
} from "@/ui/Label/Section";
import { FC, useCallback } from "react";

type SectionProps = Omit<
    PPLabelSectionProps,
    "assignedLabels" | "onLabelClick" | "onLabelRemove"
>;

type RenderProps = {
    field: ControllerRenderProps<FieldValues, string>;
    labelSectionProps: SectionProps;
};

const Render: FC<RenderProps> = ({
    field: { value, onChange },
    labelSectionProps,
}) => {
    const onClick = useCallback(
        (id: number) => onChange([...value, id]),
        [value, onChange]
    );
    const onRemove = useCallback(
        (id: number) => {
            const filtered = value.filter((_id: number) => _id !== id);
            onChange(filtered);
        },
        [value, onChange]
    );

    return (
        <LabelSection
            assignedLabels={value}
            onLabelClick={onClick}
            onLabelRemove={onRemove}
            {...labelSectionProps}
        />
    );
};

export type { SectionProps };
export default Render;
