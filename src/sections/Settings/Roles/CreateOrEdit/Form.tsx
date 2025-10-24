import { RoleReq } from "@/types/roles";
import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Form: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm<RoleReq>({
        values: {
            name: "",
            color: "",
            description: "",
            propertyPermissions: {
                view: false,
                edit: false,
                delete: false,
                // ...
                allStates: false,
                states: [],
                // ...
                allParentCategories: false,
                parentCategories: [],
                // ...
                allCategories: false,
                categories: [],
                // ...
                allUsers: false,
                users: [],
            },
            users: [],
        },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
