import { resetBasic } from "@/slices/filters";
import { useTranslation } from "react-i18next";
import CodeSelect from "./Code";
import FilterLabels from "./Labels";
import ManagerSelect from "./Manager";
import ClearableSection from "@/components/Filters/ClearableSection";
import Stack from "@mui/material/Stack";
import ActiveSelect from "./ActiveSelect";
import Location from "./Location";
import PriceSelect from "./Price";
import AreaSelect from "./Area";

const Basic = () => {
    const { t } = useTranslation();

    return (
        <ClearableSection title={t("Basic")} reset={resetBasic}>
            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                <CodeSelect />
                <ManagerSelect />

                <PriceSelect />
                <AreaSelect />

                <FilterLabels />

                <ActiveSelect />

                <Location />
            </Stack>
        </ClearableSection>
    );
};

export default Basic;
