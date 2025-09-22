import { ILabelPOST } from "@/types/label";
import { FC, useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import LabelSection from "@/ui/LabelSection";
import { useGetLabelsQuery } from "@/services/labels";

interface CreateAssignProps {
    ids: number[];
}

const CreateAssign: FC<CreateAssignProps> = ({ ids }) => {
    const { data, isLoading } = useGetLabelsQuery();

    const assignedLabels = useMemo(
        () => data?.ticketLabels?.filter((l) => ids?.includes(l.id)) || [],
        [data?.ticketLabels, ids]
    );

    const { setValue } = useFormContext();
    const old = (useWatch({ name: "labels" }) as number[]) || [];

    const handleCreate = useCallback(
        (newId: number) =>
            setValue("labels", [...old, newId], { shouldDirty: true }),
        [old]
    );

    const handleLabelClick = (l: ILabelPOST) => handleCreate(l.id!);

    const handleRemove = useCallback(
        (id: number) => {
            const filtered = old.filter((oldId) => oldId !== id);
            setValue("labels", filtered, { shouldDirty: true });
        },
        [old]
    );

    return (
        <LabelSection
            loading={isLoading}
            assignedLabels={assignedLabels}
            variant="ticket"
            onLabelClick={handleLabelClick}
            onLabelCreate={handleCreate}
            onLabelRemove={handleRemove}
        />
    );
};

export default CreateAssign;
