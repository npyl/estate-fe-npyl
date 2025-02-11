import { FC } from "react";
import { useTranslation } from "react-i18next";
import Panel from "@/components/Panel";

import CustomerDemand, {
    CustomerDemandProps,
} from "@/sections/Customer/ViewById/Demand";

interface DemandSectionProps extends CustomerDemandProps {
    index: number;
}

const DemandSection: FC<DemandSectionProps> = ({ index, ...props }) => {
    const { t } = useTranslation();
    const title = `${t("Demand")} No.${index + 1}`;

    return (
        <Panel label={title} childrenSx={{ p: 0 }}>
            <CustomerDemand {...props} />
        </Panel>
    );
};

export default DemandSection;
