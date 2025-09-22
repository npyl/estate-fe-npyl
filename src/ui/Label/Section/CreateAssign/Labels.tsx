import { Stack, StackProps } from "@mui/material";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import { FC, MouseEvent } from "react";

const getLabel =
    (
        disabled: boolean,
        onLabelClick: ((l: ILabel) => void) | undefined,
        onRemove: ((id: number) => void) | undefined
    ) =>
    (l: ILabel) => {
        const { id, color, name } = l;

        const onClick = (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onLabelClick?.(l);
        };
        const onClose = onRemove ? () => onRemove(id) : undefined;

        return (
            <Label
                key={id}
                color={color}
                name={name}
                disabled={disabled}
                onClick={onClick}
                onClose={onClose}
            />
        );
    };

interface LabelsProps extends StackProps {
    labels: ILabel[];
    disabled?: boolean;
    onLabelClick?: (l: ILabel) => void;
    onLabelRemove?: (id: number) => void;
}

const Labels: FC<LabelsProps> = ({
    disabled = false,
    labels,
    onLabelClick,
    onLabelRemove,
    ...props
}) => (
    <Stack direction="row" flexWrap="wrap" gap={1} px={0.5} {...props}>
        {labels.map(getLabel(disabled, onLabelClick, onLabelRemove))}
    </Stack>
);

export default Labels;
