import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ITabRendererProps } from "../types";

const Profile: FC<ITabRendererProps> = () => {
    const { t } = useTranslation();
    return t("Profile");
};

export default Profile;
