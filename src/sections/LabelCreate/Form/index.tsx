import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CreateButton from "./CreateButton";
import Preview from "@/sections/Label/Create/Preview";
import RHFColorPicker from "@/sections/Label/Create/RHFColorPicker";
import { RHFTextField } from "@/components/hook-form";
import { FC } from "react";
import { LabelResourceType } from "@/types/label";

interface LabelFormProps {
    resourceId?: number;
    resource: LabelResourceType;
    onCreate?: (id: number) => void;
}

const LabelForm: FC<LabelFormProps> = ({ resourceId, resource, onCreate }) => {
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h5" mt={2}>
                {t("Create Label")}
            </Typography>
            <Stack spacing={3} mt={1}>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                        <RHFTextField
                            fullWidth
                            label={t("Title")}
                            name="name"
                            variant="outlined"
                        />
                    </Stack>

                    <RHFColorPicker />

                    <Preview />

                    <CreateButton
                        resourceId={resourceId}
                        resource={resource}
                        onCreate={onCreate}
                    />
                </Stack>
            </Stack>
        </>
    );
};

export default LabelForm;
