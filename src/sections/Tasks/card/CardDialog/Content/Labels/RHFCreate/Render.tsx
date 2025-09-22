import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreateAssign from "@/ui/LabelSection/CreateAssign";
import { FC, useCallback, useMemo } from "react";
import { useGetLabelsQuery } from "@/services/labels";
import { ILabelPOST } from "@/types/label";
import isFalsy from "@/utils/isFalsy";
import { SxProps, Theme } from "@mui/material";

type RenderProps = {
    sx?: SxProps<Theme>;
    field: ControllerRenderProps<FieldValues, string>;
};

const Render: FC<RenderProps> = ({ field: { value, onChange }, sx }) => {
    const { data, isLoading } = useGetLabelsQuery();

    const assignedLabels = useMemo(
        () => data?.ticketLabels?.filter((l) => value?.includes(l.id)) || [],
        [data?.ticketLabels, value]
    );

    const onClick = useCallback(
        (l: ILabelPOST) => {
            if (isFalsy(l.id)) return;
            onChange([...value, l.id!]);
        },
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
        <CreateAssign
            loading={isLoading}
            assignedLabels={assignedLabels}
            variant="ticket"
            onLabelClick={onClick}
            onLabelRemove={onRemove}
            sx={sx}
        />
    );
};

export default Render;
