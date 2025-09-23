import Panel from "@/components/Panel";
import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface PanelWrapperProps extends PropsWithChildren {
    noPanel?: boolean;
}

const PanelWrapper: FC<PanelWrapperProps> = ({ noPanel = false, children }) => {
    const { t } = useTranslation();

    if (noPanel) return children;

    return (
        <Panel label={t("Notes")} headerSx={{ boxShadow: 3 }}>
            {children}
        </Panel>
    );
};

export default PanelWrapper;
