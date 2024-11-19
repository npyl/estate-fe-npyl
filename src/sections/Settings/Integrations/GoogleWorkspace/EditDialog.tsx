import {
    IGoogleWorkspaceIntegrationReq,
    useUpdateGoogleWorkspaceIntegration,
} from "@/services/company";
import Dialog from "@/components/Dialog";
import { FC, useCallback } from "react";
import { RHFTextField } from "@/components/hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
    onClose: VoidFunction;
}

const EditDialog: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation();

    const [update, { isLoading }] = useUpdateGoogleWorkspaceIntegration();

    const methods = useForm<IGoogleWorkspaceIntegrationReq>({});

    const handleSubmit = useCallback(
        (d: IGoogleWorkspaceIntegrationReq) => update(d),
        []
    );

    return (
        <Dialog
            open
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
                    </Stack>
                </FormProvider>
            }
            actions={
                <>
                    <Button onClick={onClose}>{t("Cancel")}</Button>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {t("Save")}
                    </LoadingButton>
                </>
            }
        />
    );
};

export default EditDialog;
