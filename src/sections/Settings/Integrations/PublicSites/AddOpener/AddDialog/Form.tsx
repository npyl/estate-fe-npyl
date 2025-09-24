import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPublicSiteReq } from "@/types/company";
import { z } from "zod";

const schema = z.object({
    siteUrl: z.string().nonempty(),
});

interface FormProps extends PropsWithChildren {}

const Form: FC<FormProps> = ({ children }) => {
    const methods = useForm<IPublicSiteReq>({
        values: { siteUrl: "" },
        resolver: zodResolver(schema),
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
