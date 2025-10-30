import { BlogPostReq, BlogPostRes } from "@/types/company/blog";
import { descriptionsToDescriptionsReq } from "@/types/description/mapper";
import preventDefault from "@/utils/preventDefault";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const BlogPostResToReq = (d?: BlogPostRes): BlogPostReq => ({
    id: d?.id,
    publicSites: d?.sites?.map(({ id }) => id) ?? [],
    categories: d?.categories?.map(({ key }) => key) || [],
    descriptions: descriptionsToDescriptionsReq(d?.descriptions),
    images: [], // INFO: will be filled-in by <ImagesPicker />
});

const schema = z
    .object({
        // categories: z.array(z.string()),
    })
    .passthrough();

interface FormProps extends PropsWithChildren {
    data?: BlogPostRes;
}

const Form: FC<FormProps> = ({ data, children }) => {
    const methods = useForm<BlogPostReq>({
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
