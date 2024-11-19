import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const { formState, reset } = useFormContext();

    const isSubmitting = formState.isSubmitting;
    const isDirty =
        // _isAllDay !== isAllDay ||
        // _allDayDate !== allDayDate ||
        formState.isDirty;

    const handleReset = useCallback(() => reset(), []);

    return (
        <>
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
        </>
    );
};

export default Actions;
