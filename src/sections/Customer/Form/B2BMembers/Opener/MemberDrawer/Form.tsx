import { B2BMemberReq } from "@/types/customer";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps extends PropsWithChildren {
    member?: B2BMemberReq;
}

const Form: FC<FormProps> = ({ member, children }) => {
    const methods = useForm<B2BMemberReq>({
        values: member,
    });

    return (
        <Stack spacing={1} component="form">
            <FormProvider {...methods}>{children}</FormProvider>
        </Stack>
    );
};

export default Form;
