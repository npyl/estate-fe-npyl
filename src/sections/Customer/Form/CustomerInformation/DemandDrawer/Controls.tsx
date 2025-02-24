import { FC } from "react";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";

interface ControlsProps {
    onSave: VoidFunction;
}

const Controls: FC<ControlsProps> = ({ onSave }) => {
    const { t } = useTranslation();
    const { formState } = useFormContext();
    const { isDirty } = formState || {};
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
            zIndex={1}
            position="sticky"
            bottom={-16}
            right={0}
            p={1}
            bgcolor="background.paper"
        >
            {isDirty ? (
                <Button variant="contained" onClick={onSave}>
                    {t("Save")}
                </Button>
            ) : null}
        </Stack>
    );
};

export default Controls;
