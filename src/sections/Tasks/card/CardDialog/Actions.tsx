import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Reporter from "@/ui/Reporter";
import { SpaceBetween } from "@/components/styled";
import Stack from "@mui/material/Stack";
import { TASK } from "@/constants/tests";

interface ActionsProps {
    quickCreate: boolean;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ quickCreate, onClose }) => {
    const { t } = useTranslation();

    const { formState } = useFormContext();

    const isSubmitting = formState.isSubmitting;
    const isDirty = formState.isDirty;

    return (
        <SpaceBetween alignItems="center" width={1}>
            <Reporter />

            <Stack direction="row" alignItems="center" spacing={1}>
                <Button onClick={onClose}>{t("Close")}</Button>

                {/* TODO: this must be investigated though! */}
                {/* INFO: invisible button; used in testing because LoadingButton has problems! */}
                <button type="submit" data-testid={TASK.SUBMIT_ID} />

                {isDirty || quickCreate ? (
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
