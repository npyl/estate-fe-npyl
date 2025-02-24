import { SxProps, Tab, TabProps, Theme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./RemoveButton";

const TabSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 2,
};

interface DemandTabProps extends TabProps {
    index: number;
    removeTab: (removeIndex: number) => void;
}

const DemandTab: FC<DemandTabProps> = ({ index, removeTab, ...props }) => {
    const { t } = useTranslation();

    const label = `${t("Demand")} ${index + 1}`;

    return (
        <Tab
            label={label}
            sx={TabSx}
            icon={<RemoveButton index={index} removeTab={removeTab} />}
            {...props}
        />
    );
};

export default DemandTab;
