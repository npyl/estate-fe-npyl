import FiltersBar from "@/components/Filters/FiltersBar";
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
}

const AgreementsFiltersBar: React.FC<Props> = ({ customer }) => (
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
        bottomContent={<ChosenFilters />}
    />
);

export default AgreementsFiltersBar;
