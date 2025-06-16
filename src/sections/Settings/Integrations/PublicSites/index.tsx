import BaseItem from "../BaseItem";
import { useTranslation } from "react-i18next";
import PublicLogo from "@/assets/logo/Public";
import AddOpener from "./AddOpener";
import List from "./List";

const PublicSites = () => {
    const { t } = useTranslation();

    return (
        <BaseItem
            Icon={PublicLogo}
            type={t("Public Sites")}
            topRightContent={<AddOpener />}
        >
            <List />
        </BaseItem>
    );
};

export default PublicSites;
