import { SxProps, Tab, TabProps, Theme } from "@mui/material";
import { FC, RefObject } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./RemoveButton";
import { TabsRef } from "../types";

const TabSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 2,
};

interface DemandTabProps extends TabProps {
    index: number;
    tabsRef: RefObject<TabsRef>;
}

const DemandTab: FC<DemandTabProps> = ({ index, tabsRef, ...props }) => {
    const { t } = useTranslation();

    const label = `${t("Demand")} ${index + 1}`;

    return (
        <Tab
            label={label}
            sx={TabSx}
            icon={<RemoveButton index={index} tabsRef={tabsRef} />}
            {...props}
        />
    );
};

export default DemandTab;
