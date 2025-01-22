import ViewPanel, { ViewPanelProps } from "@/components/Panel/View";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import QuickViewToggle from "./QuickViewToggle";
import { SxProps, Theme } from "@mui/material";

interface PanelWithQuickView extends ViewPanelProps {
    hideHeader?: boolean;
    toggleSx?: SxProps<Theme>;
}

const PanelWithQuickView: FC<PanelWithQuickView> = ({
    hideHeader = false,
    label,
    headerSx,
    toggleSx,
    ...props
}) => {
    const { t } = useTranslation();
    return (
        <QuickViewToggle sectionName={label} sx={toggleSx}>
            <ViewPanel
                label={t(label)}
                headerSx={{
                    display: hideHeader ? "none" : "block",
                    ...headerSx,
                }}
                {...props}
            />
        </QuickViewToggle>
    );
};

export default PanelWithQuickView;
