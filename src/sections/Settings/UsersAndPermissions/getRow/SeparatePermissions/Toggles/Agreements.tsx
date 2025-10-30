import { useToggleAgreementsAccessMutation } from "@/services/user";
import { FC } from "react";
import ToggleButton from "./ToggleButton";
import { useTranslation } from "react-i18next";

interface ToggleAgreementsProps {
    userId: number;
    enabled: boolean;
}

const ToggleAgreements: FC<ToggleAgreementsProps> = ({ userId, enabled }) => {
    const { t } = useTranslation();

    const [toggle, { isLoading }] = useToggleAgreementsAccessMutation();

    return (
        <ToggleButton
            label={t("Agreements")}
            userId={userId}
            enabled={enabled}
            loading={isLoading}
            toggleCb={toggle}
        />
    );
};

export default ToggleAgreements;
