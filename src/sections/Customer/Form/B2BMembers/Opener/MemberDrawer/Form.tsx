import { B2BMemberReq } from "@/types/customer";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Form: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm<B2BMemberReq>();
    return (
        <Stack spacing={1} component="form">
            <FormProvider {...methods}>{children}</FormProvider>
        </Stack>
    );
};

export default Form;
