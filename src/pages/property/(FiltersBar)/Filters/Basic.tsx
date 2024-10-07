import { resetBasic } from "@/slices/filters";
import { useTranslation } from "react-i18next";
import CodeSelect from "./Code";
import FilterLabels from "./Labels";
import ManagerSelect from "./Manager";
import RangeSelect from "@/sections/Filters/Range";
import ClearableSection from "@/components/Filters/ClearableSection";
import Stack from "@mui/material/Stack";
import ActiveSelect from "./ActiveSelect";
import Location from "./Location";

const Basic = () => {
    const { t } = useTranslation();

    return (
        <ClearableSection title={t("Basic")} reset={resetBasic}>
            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                <CodeSelect />
                <ManagerSelect />

                <RangeSelect type="price" />
                <RangeSelect type="area" />

                <FilterLabels />

                <ActiveSelect />

                <Location />
            </Stack>
        </ClearableSection>
    );
};

export default Basic;
