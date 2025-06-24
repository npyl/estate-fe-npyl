import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    content: z.string(),
});

interface BlogReq {
    content: string;
}

const Form: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm<BlogReq>({
        values: {
            content: "",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = useCallback((d: BlogReq) => {}, []);

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
