import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreateAssign from "@/ui/LabelSection/CreateAssign";
import { FC, useCallback, useMemo } from "react";
import { useGetLabelsQuery } from "@/services/labels";
import { ILabelPOST } from "@/types/label";
import isFalsy from "@/utils/isFalsy";

type RenderProps = {
    field: ControllerRenderProps<FieldValues, string>;
};

const Render: FC<RenderProps> = ({ field: { value, onChange } }) => {
    const { data, isLoading } = useGetLabelsQuery();

    const assignedLabels = useMemo(
        () => data?.ticketLabels?.filter((l) => value?.includes(l.id)) || [],
        [data?.ticketLabels, value]
    );

    const onAdd = useCallback(
        (id: number) => onChange([...value, id]),
        [value, onChange]
    );
    const onClick = useCallback(
        (l: ILabelPOST) => {
            if (isFalsy(l.id)) return;
            onAdd(l.id!);
        },
        [onAdd]
    );
    const onRemove = useCallback(
        (id: number) => {
            const filtered = value.filter((_id: number) => _id !== id);
            onChange(filtered);
        },
        [value, onChange]
    );

    return (
        <CreateAssign
            loading={isLoading}
            assignedLabels={assignedLabels}
            variant="ticket"
            onLabelClick={onClick}
            onLabelCreate={onAdd}
            onLabelRemove={onRemove}
        />
    );
};

export default Render;
