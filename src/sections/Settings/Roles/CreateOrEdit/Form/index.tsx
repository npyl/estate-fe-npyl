import { useGetRoleByIdQuery } from "@/services/roles";
import { RoleReq } from "@/types/roles";
import preventDefault from "@/utils/preventDefault";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useValues from "./useValues";

interface FormProps extends PropsWithChildren {
    roleId?: number;
}

const Form: FC<FormProps> = ({ roleId = -1, children }) => {
    const { data } = useGetRoleByIdQuery(roleId, { skip: roleId === -1 });

    const values = useValues(data);

    const methods = useForm<RoleReq>({ values });

    return (
        <form onSubmit={preventDefault}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
