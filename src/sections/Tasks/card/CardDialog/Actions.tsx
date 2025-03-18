import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { FC, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Reporter from "./Reporter";
import { SpaceBetween } from "@/components/styled";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

interface ActionsProps {
    PersistNotice: ReactNode;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ PersistNotice, onClose }) => {
    const { t } = useTranslation();

    const { formState } = useFormContext();

    const isSubmitting = formState.isSubmitting;
    const isDirty = formState.isDirty;

    return (
        <Stack spacing={1} width={1}>
            {PersistNotice}
            {PersistNotice ? <Divider /> : null}

            <SpaceBetween alignItems="center" width={1}>
                <Reporter />

                <Stack direction="row" alignItems="center" spacing={1}>
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
        </Stack>
    );
};

export default Actions;
