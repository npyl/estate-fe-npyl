import { Label } from "@/components/Label";
import { useGetLabelsQuery } from "@/services/labels";
import { ILabel } from "@/types/label";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { FC, useMemo } from "react";
import { getBorderColor2 } from "@/theme/borderColor";
import { SpaceBetween } from "@/components/styled";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import AddButton from "./AddButton";
import { useFormContext, useWatch } from "react-hook-form";

const getLabel = (onRemove: (id: number) => void) => (l: ILabel) =>
    (
        <Label
            key={l.id}
            color={l.color}
            name={l.name}
            width="min-content"
            onClose={() => onRemove(l.id)}
        />
    );

interface CreateAssignProps {
    ids?: number[];
}

const CreateAssign: FC<CreateAssignProps> = ({ ids }) => {
    const { t } = useTranslation();

    const { data, isLoading } = useGetLabelsQuery();

    const { setValue } = useFormContext();
    const old = (useWatch({ name: "labels" }) as number[]) || [];
    const handleRemove = (id: number) => {
        const filtered = old.filter((oldId) => oldId !== id);
        setValue("labels", filtered, { shouldDirty: true });
    };

    const labels = useMemo(
        () => data?.ticketLabels?.filter((l) => ids?.includes(l.id)) || [],
        [data?.ticketLabels, ids]
    );

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    return (
        <Stack
            spacing={1}
            width={1}
            border="1px solid"
            borderColor={getBorderColor2}
            borderRadius="10px"
            p={0.5}
        >
            <SpaceBetween alignItems="center">
                <Typography>{t("Labels")}</Typography>
                <AddButton />
            </SpaceBetween>
            <Stack direction="row" spacing={1} flexWrap="wrap" width={1}>
                {labels?.map(getLabel(handleRemove))}
            </Stack>
        </Stack>
    );
};

export default CreateAssign;
