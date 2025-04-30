import { FC, PropsWithChildren, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IDeal } from "./types";

const Form: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm<IDeal>();
    const onSubmit = useCallback((d: IDeal) => {}, []);
    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
