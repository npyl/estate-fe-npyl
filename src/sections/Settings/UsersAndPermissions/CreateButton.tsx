import { useTranslation } from "react-i18next";
const UserForm = dynamic(() => import("@/sections/User/Form"));
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import CreateFab from "@/ui/CreateFab";

const CreateButton = () => {
    const { t } = useTranslation();

    const [isOpen, open, close] = useDialog();

    return (
        <>
            <CreateFab onClick={open}>{t("Create User")}</CreateFab>
            {isOpen ? <UserForm onClose={close} /> : null}
        </>
    );
};

export default CreateButton;
