import Tab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import React from "react";
import { TListingTab } from "./types";

interface TabProps {
    tab: TListingTab;
    onChange: (s: TListingTab) => void;
}

const Tabs: React.FC<TabProps> = ({ tab, onChange }) => (
    <MuiTabs value={tab} onChange={(_, v) => onChange(v)}>
        <Tab label="CRM" value="CRM" />
        <Tab label="Spitogatos" value="SPITOGATOS" />
    </MuiTabs>
);

export default Tabs;
