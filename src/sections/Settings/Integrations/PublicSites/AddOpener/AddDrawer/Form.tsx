import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPublicSiteReq } from "@/types/company";
import { z } from "zod";
import preventDefault from "@/utils/preventDefault";

const schema = z.object({
    siteUrl: z.string().nonempty(),
});

interface FormProps extends PropsWithChildren {}

const Form: FC<FormProps> = ({ children }) => {
    const methods = useForm<IPublicSiteReq>({
        values: { siteUrl: "" },
        resolver: zodResolver(schema),
    });

    return (
        <Stack spacing={1} component="form" onSubmit={preventDefault}>
            <FormProvider {...methods}>{children}</FormProvider>
        </Stack>
    );
};

export default Form;
