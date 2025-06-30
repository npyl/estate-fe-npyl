import Link from "@/components/Link";
import { useCreateOrUpdateBlogPostMutation } from "@/services/blog";
import { BlogPostReq } from "@/types/company";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { FC, MouseEvent, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const useSubmit = (siteId: number, isAll: boolean = false) => {
    const methods = useFormContext<BlogPostReq>();
    const [submit] = useCreateOrUpdateBlogPostMutation();
    const handleSubmit = useCallback(
        (post: BlogPostReq) => {
            return submit(post);
        },
        [siteId, isAll]
    );
    const onSubmit = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            return methods.handleSubmit(handleSubmit)(e);
        },
        [handleSubmit]
    );
    return { onSubmit, isLoading: methods.formState.isLoading };
};

interface Props {
    postId: number;
}

const CancelButton = () => {
    const { t } = useTranslation();
    return (
        <Button LinkComponent={Link} href={`/blog`}>
            {t("Cancel")}
        </Button>
    );
};

const ALL_PUBLICS = true;

const SaveAllButton: FC<Props> = ({ postId }) => {
    const { t } = useTranslation();
    const { onSubmit, isLoading } = useSubmit(postId, ALL_PUBLICS);
    return (
        <LoadingButton
            loading={isLoading}
            disabled={isLoading}
            variant="contained"
            color="info"
            onClick={onSubmit}
        >
            {t("Save to all")}
        </LoadingButton>
    );
};

const SaveButton: FC<Props> = ({ postId }) => {
    const { t } = useTranslation();
    const { onSubmit, isLoading } = useSubmit(postId);
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

const Actions: FC<Props> = ({ postId }) => (
    <Stack direction="row" justifyContent="flex-end" spacing={1} mt={1}>
        <CancelButton />
        <SaveAllButton postId={postId} />
        <SaveButton postId={postId} />
    </Stack>
);

export default Actions;
