import { Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CreateButton from "./CreateButton";
import Preview from "@/sections/Label/Create/Preview";
import RHFColorPicker from "@/sections/Label/Create/RHFColorPicker";
import { RHFTextField } from "@/components/hook-form";
import { FC } from "react";
import { ILabel, LabelResourceType } from "@/types/label";
import { FormProvider, useForm } from "react-hook-form";
import { ILabelForm } from "@/sections/Label/Create/types";
import { SpaceBetween } from "@/components/styled";

interface LabelFormProps {
    label?: ILabel; // edit mode

    // assign mode
    resourceId?: number;
    resource: LabelResourceType;

    onCancel: () => void;
    onCreate?: (id: number) => void;
}

const LabelForm: FC<LabelFormProps> = ({
    label,
    resourceId,
    resource = "property",
    onCancel,
    onCreate,
}) => {
    const { t } = useTranslation();

    const isEdit = Boolean(label);
    const title = isEdit ? t("Edit Label") : t("Create Label");

    const methods = useForm<ILabelForm>({
        values: {
            id: label?.id,
            name: label?.name || "",
            color: label?.color || "#22194d",
            resource,
        },
    });

    return (
        <FormProvider {...methods}>
            <Typography variant="h5" mt={2}>
                {title}
            </Typography>
            <Stack spacing={3} mt={1}>
                <RHFTextField
                    fullWidth
                    label={t("Title")}
                    name="name"
                    variant="outlined"
                />

                <RHFColorPicker />

                <Preview />

                <SpaceBetween alignItems="center">
                    <Button onClick={onCancel}>{t("Cancel")}</Button>
                    <CreateButton
                        edit={isEdit}
                        resourceId={resourceId}
                        resource={resource}
                        onCreate={onCreate}
                    />
                </SpaceBetween>
            </Stack>
        </FormProvider>
    );
};

export default LabelForm;
