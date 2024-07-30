import { FilterButton } from "@/components/Filters";
import FiltersBar from "@/components/Filters/FiltersBar";
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
import FilterDraft from "./Filters/Draft";

interface Props {
    customer: boolean;
    onClickNew: VoidFunction;
}

const AgreementsFiltersBar: React.FC<Props> = ({ customer, onClickNew }) => {
    const { t } = useTranslation();

    return (
        <FiltersBar
            filters={
                <>
                    {customer ? null : <FilterType />}
                    <FilterExpirationDate />
                    <FilterActive />
                    <FilterKeys />
                    <FilterSigned />
                    <FilterDraft />
                </>
            }
            controls={
                <FilterButton
                    sx={{
                        mt: 1,
                    }}
                    endIcon={<AddIcon />}
                    onClick={onClickNew}
                >
                    {t("New")}
                </FilterButton>
            }
            bottomContent={<ChosenFilters />}
        />
    );
};

export default AgreementsFiltersBar;
