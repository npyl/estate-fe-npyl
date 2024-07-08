import { FilterButton } from "@/components/Filters";
import FiltersBar from "@/components/Filters/FiltersBar";
import { SpaceBetween } from "@/components/styled";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import ChosenFilters from "./ChosenFilters";
import {
    FilterActive,
    FilterExpirationDate,
    FilterKeys,
    FilterSigned,
    FilterType,
} from "./Filters";
import Stack from "@mui/material/Stack";
import FilterDraft from "./Filters/Draft";

interface Props {
    onClickNew: VoidFunction;
}

const AgreementsFiltersBar: React.FC<Props> = ({ onClickNew }) => {
    const { t } = useTranslation();

    return (
        <FiltersBar>
            <SpaceBetween>
                <Stack
                    direction="row"
                    spacing={0.3}
                    pt={1}
                    overflow="auto hidden"
                >
                    <FilterType />
                    <FilterExpirationDate />
                    <FilterActive />
                    <FilterKeys />
                    <FilterSigned />
                    <FilterDraft />
                </Stack>

                <FilterButton endIcon={<AddIcon />} onClick={onClickNew}>
                    {t("New")}
                </FilterButton>
            </SpaceBetween>

            <ChosenFilters />
        </FiltersBar>
    );
};

export default AgreementsFiltersBar;
