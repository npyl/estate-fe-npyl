import { useGetRoleByIdQuery } from "@/services/roles";
import { RoleReq, RoleToRoleReq } from "@/types/roles";
import preventDefault from "@/utils/preventDefault";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps extends PropsWithChildren {
    roleId?: number;
}

const Form: FC<FormProps> = ({ roleId = -1, children }) => {
    const { data } = useGetRoleByIdQuery(roleId, { skip: roleId === -1 });

    const methods = useForm<RoleReq>({
        values: RoleToRoleReq(data),
    });

    return (
        <form onSubmit={preventDefault}>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
};

export default Form;
