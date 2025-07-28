import { yupResolver } from "@hookform/resolvers/yup";
import { FC, PropsWithChildren, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAddUserMutation } from "@/services/user";
import { IUser, IUserPOST } from "@/types/user";
import { Schema } from "./validation";
import { useAuth } from "@/hooks/use-auth";

interface FormProps extends PropsWithChildren {
    user?: IUser;
    onClose: VoidFunction;
}

const Form: FC<FormProps> = ({ user, onClose, children }) => {
    const { user: _loggedInUser } = useAuth();

    const values = useMemo(
        () => ({
            id: user?.id,
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            workspaceEmail: user?.workspaceEmail || "",
            password: user?.password || "",
            mobilePhone: user?.mobilePhone || "",
            homePhone: user?.homePhone || "",
            businessPhone: user?.businessPhone || "",
            officePhone: user?.officePhone || "",
            callCenterNumber: user?.callCenterNumber || "",
            address: user?.address || "",
            zipCode: user?.zipCode || "",
            city: user?.city || "",
            region: user?.region || "",
            afm: user?.afm || "",
            doy: user?.doy || "",
            gemh: user?.gemh || "",
            status: "Active",
            preferredLanguage: user?.preferredLanguage?.key || "ENGLISH",
        }),
        [user]
    );

    const methods = useForm<IUserPOST>({
        resolver: yupResolver(Schema),
        values,
        mode: "onChange",
    });

    const [addUser] = useAddUserMutation();

    const onSubmit = async ({ status, ...user }: IUserPOST) => {
        await addUser(user);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default Form;
