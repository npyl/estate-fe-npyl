import { IAgreement, IAgreementsFilters } from "@/types/agreements";
import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import Grid from "@mui/material/Grid";
import AgreementCard from "./AgreementCard";
import AgreementCardSkeleton from "./AgreementCardSkeleton";

const useFilterAgreementsQuery = (
    filter?: IAgreementsFilters
): {
    data: IAgreement[];
    isLoading: boolean;
} => {
    return {
        data: [],
        isLoading: false,
    };
};

const CardsContent = () => {
    const { filters } = useAgreementsFiltersContext();

    const { data, isLoading } = useFilterAgreementsQuery(filters);

    return (
        <Grid container>
            {isLoading ? (
                <>
                    <AgreementCardSkeleton />
                    <AgreementCardSkeleton />
                    <AgreementCardSkeleton />
                </>
            ) : null}

            {data?.map((a) => (
                <AgreementCard key={a.id} a={a} />
            ))}
        </Grid>
    );
};

export default CardsContent;
