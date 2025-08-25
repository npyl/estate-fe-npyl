import { yupResolver } from "@hookform/resolvers/yup";
import { FC, PropsWithChildren, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IUser, IUserPOST, IUserToReq } from "@/types/user";
import { Schema } from "./validation";
import { useAuth } from "@/hooks/use-auth";
import preventDefault from "@/utils/preventDefault";

interface FormProps extends PropsWithChildren {
    user?: IUser;
}

const Form: FC<FormProps> = ({ user, children }) => {
    const { user: _loggedInUser } = useAuth();

    const values = useMemo(() => IUserToReq(user), [user]);

    const methods = useForm<IUserPOST>({
        resolver: yupResolver(Schema),
        values,
        mode: "onChange",
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={preventDefault}>{children}</form>
        </FormProvider>
    );
};

export default Form;
