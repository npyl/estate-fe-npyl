import { resetBasic } from "@/slices/filters";
import { useTranslation } from "react-i18next";
import SubCategorySelect from "./Category";
import CodeSelect from "./Code";
import FilterLabels from "./Labels";
import ManagerSelect from "./Manager";
import CategorySelect from "./ParentCategory";
import PriceSelect from "./Price";
import SaleSelect from "./Sale";
import ClearableSection from "@/components/Filters/ClearableSection";
import Stack from "@mui/material/Stack";

const Basic = () => {
    const { t } = useTranslation();

    return (
        <ClearableSection title={t("Basic")} reset={resetBasic}>
            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                <CodeSelect />
                <ManagerSelect />

                <SaleSelect />

                <CategorySelect />
                <SubCategorySelect />

                <PriceSelect type="price" />
                <PriceSelect type="area" />

                <FilterLabels />
            </Stack>
        </ClearableSection>
    );
};

export default Basic;
