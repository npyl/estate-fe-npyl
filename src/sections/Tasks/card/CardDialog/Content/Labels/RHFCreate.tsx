import { Label } from "@/components/Label";
import useDialog from "@/hooks/useDialog";
import { useGetLabelsQuery } from "@/services/labels";
import { ILabel } from "@/types/label";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { getBorderColor2 } from "@/theme/borderColor";
import { SpaceBetween } from "@/components/styled";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import LoadingIconButton from "@/components/LoadingIconButton";
const AddLabelDialog = dynamic(() => import("@/sections/LabelCreate/Dialog"));

const AddButton = () => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    const { watch, setValue } = useFormContext();
    const handleLabelClick = useCallback((l: ILabel) => handleCreate(l.id), []);
    const handleCreate = useCallback((newId: number) => {
        const old = watch("labels") || [];
        setValue("labels", [...old, newId]);
    }, []);

    return (
        <>
            <LoadingIconButton onClick={openDialog} size="small">
                <AddIcon />
            </LoadingIconButton>

            {isOpen ? (
                <AddLabelDialog
                    variant="ticket"
                    onClose={closeDialog}
                    onLabelClick={handleLabelClick}
                    onCreate={handleCreate}
                />
            ) : null}
        </>
    );
};

const getLabel = (l: ILabel) => (
    <Label key={l.id} color={l.color} name={l.name} width="min-content" />
);

interface CreateAssignProps {
    ids?: number[];
}

const CreateAssign: FC<CreateAssignProps> = ({ ids }) => {
    const { t } = useTranslation();

    const { data, isLoading } = useGetLabelsQuery();

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
                {labels?.map(getLabel)}
            </Stack>
        </Stack>
    );
};

const RHFCreate = () => {
    const { control } = useFormContext();
    return (
        <Controller
            name="labels"
            control={control}
            render={({ field: { value } }) => <CreateAssign ids={value} />}
        />
    );
};

export default RHFCreate;
