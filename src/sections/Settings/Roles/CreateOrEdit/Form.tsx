import { RoleReq } from "@/types/roles";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Form: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm<RoleReq>({});
    return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
