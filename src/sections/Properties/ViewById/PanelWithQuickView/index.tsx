import ViewPanel, { ViewPanelProps } from "@/components/Panel/View";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import QuickViewToggle from "./QuickViewToggle";

const PanelWithQuickView: FC<ViewPanelProps> = ({ label, ...props }) => {
    const { t } = useTranslation();
    return (
        <QuickViewToggle sectionName={label}>
            <ViewPanel label={t(label)} {...props} />
        </QuickViewToggle>
    );
};

export default PanelWithQuickView;
