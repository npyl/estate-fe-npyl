import { useToggleAgreementsAccessMutation } from "@/services/user";
import { FC } from "react";
import ToggleButton from "./ToggleButton";

interface ToggleAgreementsProps {
    userId: number;
    enabled: boolean;
}

const ToggleAgreements: FC<ToggleAgreementsProps> = ({ userId, enabled }) => {
    const [toggle, { isLoading }] = useToggleAgreementsAccessMutation();

    return (
        <ToggleButton
            userId={userId}
            enabled={enabled}
            loading={isLoading}
            toggleCb={toggle}
        />
    );
};

export default ToggleAgreements;
