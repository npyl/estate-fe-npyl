import { useCreateOrUpdateBlogPostMutation } from "@/services/blog";
import { BlogPostReq } from "@/types/company";
import { LoadingButton } from "@mui/lab";
import { MouseEvent, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const useSubmit = () => {
    const router = useRouter();
    const methods = useFormContext<BlogPostReq>();
    const isDirty = methods.formState.isDirty;
    const isLoading = methods.formState.isLoading;
    const [submit] = useCreateOrUpdateBlogPostMutation();
    const handleSubmit = useCallback(async (d: BlogPostReq) => {
        const res = await submit(d);
        if ("error" in res) return;
        router.push("/blog");
    }, []);
    const onSubmit = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            return methods.handleSubmit(handleSubmit)(e);
        },
        [submit]
    );
    return { onSubmit, isLoading, isDirty };
};

const SaveButton = () => {
    const { t } = useTranslation();
    const { onSubmit, isLoading, isDirty } = useSubmit();
    if (!isDirty) return null;
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

export default SaveButton;
