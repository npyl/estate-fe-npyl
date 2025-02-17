import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import { SpaceBetween } from "@/components/styled";
import Stack from "@mui/material/Stack";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const { formState, reset } = useFormContext();

    const isSubmitting = formState.isSubmitting;
    const isDirty = formState.isDirty;

    const handleReset = useCallback(() => reset(), []);

    return (
        <SpaceBetween alignItems="center" width={1}>
            <Reporter />

            <Stack direction="row" alignItems="center" spacing={1}>
                {isDirty ? (
                    <Button onClick={handleReset}>{t("Reset")}</Button>
                ) : null}

                <Button onClick={onClose}>{t("Close")}</Button>

                {isDirty ? (
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        variant="contained"
                        type="submit"
                    >
                        {t("Save")}
                    </LoadingButton>
                ) : null}
            </Stack>
        </SpaceBetween>
    );
};

export default Actions;
