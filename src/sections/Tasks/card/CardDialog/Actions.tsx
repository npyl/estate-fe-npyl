import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const { formState } = useFormContext();

    const isSubmitting = formState.isSubmitting;

    return (
        <>
            <Button onClick={onClose}>{t("Close")}</Button>
            <LoadingButton
                loading={isSubmitting}
                disabled={isSubmitting}
                variant="contained"
                type="submit"
            >
                {t("Save")}
            </LoadingButton>
        </>
    );
};

export default Actions;
