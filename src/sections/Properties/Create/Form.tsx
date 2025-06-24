import {
    ICreatePropertyParams,
    useCreatePropertyMutation,
} from "@/services/properties";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    parentCategory: z.string(),
    category: z.string(),
});

interface FormProps extends PropsWithChildren {}

const Form: FC<FormProps> = ({ children }) => {
    const methods = useForm<ICreatePropertyParams>({
        values: {
            category: "",
            parentCategory: "",
        },
        resolver: zodResolver(schema),
    });

    const router = useRouter();
    const [create] = useCreatePropertyMutation();
    const onSubmit = useCallback(async (d: ICreatePropertyParams) => {
        const res = await create(d);
        if ("error" in res) return;
        router.push(`/property/edit/${res.data}`);
    }, []);

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
