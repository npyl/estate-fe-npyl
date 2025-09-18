import Dialog from "@/components/Dialog";
import { FC, useCallback } from "react";
import { RHFTextField } from "@/components/hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
    IGoogleWorkspaceIntegrationReq,
    useUpdateGoogleWorkspaceMutation,
} from "@/services/company/google-workspace";

interface Props {
    onClose: VoidFunction;
}

const EditDialog: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation();

    const [update, { isLoading }] = useUpdateGoogleWorkspaceMutation();

    const methods = useForm<IGoogleWorkspaceIntegrationReq>({});

    const isDirty = methods.formState.isDirty;

    const handleSubmit = useCallback(
        async (d: IGoogleWorkspaceIntegrationReq) => {
            await update(d);
            onClose();
        },
        [onClose]
    );

    return (
        <Dialog
            submit
            onSubmit={methods.handleSubmit(handleSubmit)}
            // ...
            title={<Typography>Google Workspace</Typography>}
            content={
                <FormProvider {...methods}>
                    <Stack spacing={1} py={0.5}>
                        <RHFTextField label="ClientId" name="clientId" />
                        <RHFTextField label="Secret" name="clientSecret" />
                        <RHFTextField label="Domain" name="domain" />

                        <Typography color="text.secondary" variant="body2">
                            {t("_UPDATE_WORKSPACE_EMAILS_")}
                        </Typography>
                    </Stack>
                </FormProvider>
            }
            actions={
                <>
                    <Button onClick={onClose}>{t("Cancel")}</Button>

                    {isDirty ? (
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {t("Save")}
                        </LoadingButton>
                    ) : null}
                </>
            }
        />
    );
};

export default EditDialog;
