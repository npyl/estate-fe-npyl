import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ActionsProps {
    dirty: boolean;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ dirty, onClose }) => {
    const { t } = useTranslation();

    const { formState, reset } = useFormContext();

    const isSubmitting = formState.isSubmitting;

    const handleReset = useCallback(() => reset(), []);

    return (
        <>
            {dirty ? <Button onClick={handleReset}>{t("Reset")}</Button> : null}
            <Button onClick={onClose}>{t("Close")}</Button>

            {dirty ? (
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
