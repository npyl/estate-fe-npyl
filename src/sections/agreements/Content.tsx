import { IAgreement, IAgreementsFilters } from "@/types/agreements";
import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import AgreementCard from "./Card/AgreementCard";
import AgreementCardSkeleton from "./Card/AgreementCardSkeleton";
import { Suspense, lazy, useEffect, useState } from "react";
const DeleteDialog = lazy(() => import("@/components/Dialog/Delete"));

const useFilterAgreementsMutation = (): [
    filterAgreements: (filter?: IAgreementsFilters) => void,
    {
        data: IAgreement[];
        isLoading: boolean;
    }
] => [
    () => {},
    {
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
    },
];

interface Props {
    // Are we on a property/[propertyId] page or the agreements page?
    propertyId?: number;
    onEditAgreement: (id: number) => void;
}

const CardsContent: React.FC<Props> = ({ propertyId, onEditAgreement }) => {
    const { filters } = useAgreementsFiltersContext();

    const [filterAgreements, { data, isLoading }] =
        useFilterAgreementsMutation();

    useEffect(() => {
        // TODO: if propertyId get them from the respective propertyId filter
        filterAgreements(filters);
    }, [filters]);

    const [deletableAgreement, setDeletableAgreement] = useState(-1);

    return (
        <>
            <Stack spacing={1}>
                {isLoading ? (
                    <>
                        <AgreementCardSkeleton />
                        <AgreementCardSkeleton />
                        <AgreementCardSkeleton />
                    </>
                ) : null}

                {data?.map((a) => (
                    <AgreementCard
                        key={a.id}
                        a={a}
                        onEdit={onEditAgreement}
                        onDelete={setDeletableAgreement}
                    />
                ))}
            </Stack>

            {deletableAgreement !== -1 ? (
                <Suspense>
                    <DeleteDialog
                        open
                        onClose={() => setDeletableAgreement(-1)}
                        onDelete={() => {}}
                    />
                </Suspense>
            ) : null}
        </>
    );
};

export default CardsContent;
