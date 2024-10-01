import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import RegionsTab from "./Regions";
import { useSelector } from "react-redux";
import { selectRegions } from "@/slices/filters";
import dynamic from "next/dynamic";
const CitiesTab = dynamic(() => import("./Cities"));

type TTab = "REGIONS" | "CITIES";

const Tabs = () => {
    const { t } = useTranslation();

    const [tab, setTab] = useState<TTab>("REGIONS");
    const handleChange = (_: any, t: TTab) => setTab(t);

    const regions = useSelector(selectRegions) || [];
    const notHaveRegions = regions.length === 0;

    return (
        <>
            <MuiTabs
                value={tab}
                onChange={handleChange}
                sx={{
                    px: 3,
                }}
            >
                <MuiTab label={t("Regions")} value="REGIONS" />
                <MuiTab
                    label={t("Cities")}
                    value="CITIES"
                    disabled={notHaveRegions}
                />
            </MuiTabs>

            {tab === "REGIONS" ? <RegionsTab /> : null}
            {tab === "CITIES" ? <CitiesTab /> : null}
        </>
    );
};

export default Tabs;
