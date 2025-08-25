import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import { BlogPostReq, BlogPostRes } from "@/types/company/blog";
import preventDefault from "@/utils/preventDefault";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const BlogPostResToReq = (d?: BlogPostRes): CreateOrUpdateBlogPostReq => ({
    id: d?.id,
    publicSites: d?.sites?.map(({ id }) => id) ?? [],
    categories: d?.categories?.map(({ key }) => key) || [],
    descriptions: d?.descriptions ?? {},
    images: d?.images ?? [],
    thumbnail: undefined as any,
});

const schema = z
    .object({
        content: z.string().nonempty(),
        categories: z.array(z.string()),
        thumbnail: z.any(),
    })
    .passthrough();

interface FormProps extends PropsWithChildren {
    data?: BlogPostRes;
}

const Form: FC<FormProps> = ({ data, children }) => {
    const methods = useForm<CreateOrUpdateBlogPostReq>({
        values: BlogPostResToReq(data),
        resolver: zodResolver(schema),
    });

    return (
        <form onSubmit={preventDefault}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
