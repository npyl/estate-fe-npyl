import { useTranslation } from "react-i18next";
import Pusher from "@/sections/Pusher";
import { TranslationType } from "@/types/translation";
import { ITab } from "@/types/tabs";

const getTab = (t: TranslationType): ITab => {
    return {
        path: `/profile`,
        label: t("Profile"),
    };
};

const ProfilePusher = () => {
    const { t } = useTranslation();
    return <Pusher tab={getTab(t)} />;
};

export default ProfilePusher;
