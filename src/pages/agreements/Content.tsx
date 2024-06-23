import { IAgreement, IAgreementsFilters } from "@/types/agreements";
import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import AgreementCard from "./AgreementCard";
import AgreementCardSkeleton from "./AgreementCardSkeleton";

const useFilterAgreementsQuery = (
    filter?: IAgreementsFilters
): {
    data: IAgreement[];
    isLoading: boolean;
} => {
    return {
        data: [
            {
                variant: "basic",
                id: 1,
                draft: false,
                title: "Property x100 Basic",
            } as any,
            {
                variant: "purchase",
                id: 2,
                draft: true,
                title: "Property x101 Purchase",
            } as any,
        ],
        isLoading: false,
    };
};

const CardsContent = () => {
    const { filters } = useAgreementsFiltersContext();

    const { data, isLoading } = useFilterAgreementsQuery(filters);

    return (
        <Stack spacing={1}>
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
        </Stack>
    );
};

export default CardsContent;
