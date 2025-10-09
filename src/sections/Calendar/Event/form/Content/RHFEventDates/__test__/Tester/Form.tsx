import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormReq } from "./types";

interface FormProps extends Partial<FormReq>, PropsWithChildren {}

const Form: FC<FormProps> = ({ startDate = "", endDate = "", children }) => {
    const methods = useForm<FormReq>({
        values: { startDate, endDate },
    });
    return (
        <form>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
