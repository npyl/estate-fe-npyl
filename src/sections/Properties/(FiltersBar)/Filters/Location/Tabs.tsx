import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectRegions } from "@/slices/filters";
import Content from "./Content";
import { TTab } from "./types";
import TextField from "@mui/material/TextField";
import { useDebounce } from "use-debounce";

const Tabs = () => {
    const { t } = useTranslation();

    const [tab, setTab] = useState<TTab>("REGIONS");

    const regions = useSelector(selectRegions) || [];
    const notHaveRegions = regions.length === 0;

    const [search, setSearch] = useState("");
    const [debounced] = useDebounce(search, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value.toLowerCase());

    const handleTabChange = (_: any, t: TTab) => {
        setSearch("");
        setTab(t);
    };

    return (
        <>
            <MuiTabs
                value={tab}
                onChange={handleTabChange}
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

            <TextField
                fullWidth
                value={search}
                onChange={handleSearch}
                sx={{
                    px: 3,
                    mt: 1,
                }}
            />

            <Content tab={tab} debounced={debounced} />
        </>
    );
};

export default Tabs;
