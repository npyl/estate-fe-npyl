import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";
import stopPropagation from "@/utils/stopPropagation";
import Form from "./Form";
import Content from "./Content";
import Dialog from "@/components/Dialog";
import Actions from "./Actions";
import { FC } from "react";
import isFalsy from "@/utils/isFalsy";

interface TitleProps {
    userId?: number;
}

const Title: FC<TitleProps> = ({ userId }) => {
    const { t } = useTranslation();
    return t(isFalsy(userId) ? "Create User" : "User Update");
};

interface UserFormProps {
    user?: IUser;
    onClose: () => void;
}

const UserForm: FC<UserFormProps> = ({ user, onClose }) => (
    <Form user={user}>
        <Dialog
            open
            title={<Title userId={user?.id} />}
            actions={<Actions user={user} onClose={onClose} />}
            content={<Content user={user} />}
            onClose={onClose}
            onClick={stopPropagation}
        />
    </Form>
);

export default UserForm;
