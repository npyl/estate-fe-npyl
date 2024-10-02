import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import RegionsTab from "./Regions";
import { useSelector } from "react-redux";
import { selectRegions } from "@/slices/filters";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
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
                    label={`${t("Cities")} (${regions.length})`}
                    value="CITIES"
                    disabled={notHaveRegions}
                />
            </MuiTabs>

            <Box maxHeight="30vh" overflow="hidden auto">
                {tab === "REGIONS" ? <RegionsTab /> : null}
                {tab === "CITIES" ? <CitiesTab /> : null}
            </Box>
        </>
    );
};

export default Tabs;
