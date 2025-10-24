import { useGetRoleByIdQuery } from "@/services/roles";
import { RoleReq, RoleToRoleReq } from "@/types/roles";
import isFalsy from "@/utils/isFalsy";
import preventDefault from "@/utils/preventDefault";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps extends PropsWithChildren {
    roleMode?: number | "create";
}

const Form: FC<FormProps> = ({ roleMode, children }) => {
    const id = isFalsy(roleMode) || roleMode === "create" ? -1 : roleMode!;
    const { data } = useGetRoleByIdQuery(id, { skip: id === -1 });

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
