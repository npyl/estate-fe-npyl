import Link from "@/components/Link";
import { useCreateOrUpdateBlogPostMutation } from "@/services/blog";
import { BlogPostReq } from "@/types/company";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { MouseEvent, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PublishTo from "./PublishTo";

const useSubmit = () => {
    const methods = useFormContext<BlogPostReq>();
    const [submit] = useCreateOrUpdateBlogPostMutation();
    const onSubmit = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            return methods.handleSubmit(submit)(e);
        },
        [submit]
    );
    return { onSubmit, isLoading: methods.formState.isLoading };
};

const CancelButton = () => {
    const { t } = useTranslation();
    return (
        <Button LinkComponent={Link} href={`/blog`}>
            {t("Cancel")}
        </Button>
    );
};

const SaveButton = () => {
    const { t } = useTranslation();
    const { onSubmit, isLoading } = useSubmit();
    return (
        <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            onClick={onSubmit}
        >
            {t("Save")}
        </LoadingButton>
    );
};

const Actions = () => (
    <Stack direction="row" justifyContent="flex-end" spacing={1} mt={1}>
        <CancelButton />
        <PublishTo />
        <SaveButton />
    </Stack>
);

export default Actions;
