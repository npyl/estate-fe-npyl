import { Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "src/store";

import {
    // reset
    resetBasic,
    sumOfChangedProperties,
    resetState,
} from "src/slices/filters";

import ChosenFilters from "./Filters/ChosenFilters";
import SubCategorySelect from "./Filters/Category";
import CodeSelect from "./Filters/Code";
import FilterLabels from "./Filters/Labels";
import ManagerSelect from "./Filters/Manager";
import CategorySelect from "./Filters/ParentCategory";
import PriceSelect from "./Filters/Price";
import SaleSelect from "./Filters/Sale";

import { useTranslation } from "react-i18next";

import { ClearableDialogContent } from "@/components/Filters/ClearableDialogContent";
import { FilterMoreDialog } from "@/components/Filters/FilterMore";
import Bedrooms from "./Filters/Bedrooms";
import ConstructionYear from "./Filters/ConstructionYear";
import Floors from "./Filters/Floors";
import Fields from "./Filters/Fields";

// ----------------------------------------------------------------------

type Props = {
    onClose: VoidFunction;
};

export default function FilterMore({ onClose }: Props) {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const changedPropsCount = useSelector(sumOfChangedProperties);

    const clearAll = () => dispatch(resetState());

    return (
        <FilterMoreDialog
            open
            onClose={onClose}
            changedFiltersCount={changedPropsCount}
            onResetFilter={clearAll}
        >
            {changedPropsCount > 0 ? <ChosenFilters /> : null}

            <ClearableDialogContent title={t("Basic")} reset={resetBasic}>
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
            </ClearableDialogContent>
            <Bedrooms />
            <Floors />
            <Fields />
            <ConstructionYear />
        </FilterMoreDialog>
    );
}
