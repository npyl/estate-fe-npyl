import { useCreateOrUpdateBlogPostMutation } from "@/services/company";
import { BlogPostReq, BlogPostRes } from "@/types/company/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    content: z.string(),
});

interface FormProps extends PropsWithChildren {
    siteId: number;
    data?: BlogPostRes;
}

const Form: FC<FormProps> = ({ siteId, data, children }) => {
    const methods = useForm<BlogPostReq>({
        values: {
            id: data?.id,
            content: data?.content || "",
        },
        resolver: zodResolver(schema),
    });

    const [submit] = useCreateOrUpdateBlogPostMutation();
    const onSubmit = useCallback(
        (post: BlogPostReq) => submit({ siteId, post }),
        [siteId]
    );

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
