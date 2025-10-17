import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormReq } from "./types";

interface FormProps extends PropsWithChildren {
    values?: FormReq;
}

const Form: FC<FormProps> = ({ children, values }) => {
    const methods = useForm<FormReq>({ values });
    return (
        <form>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
