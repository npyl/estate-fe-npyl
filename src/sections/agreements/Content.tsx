import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import AgreementCard from "./Card/AgreementCard";
import AgreementCardSkeleton from "./Card/AgreementCardSkeleton";
import { Suspense, lazy, useEffect, useState } from "react";
import { useFilterAgreementsMutation } from "@/services/agreements";
const DeleteDialog = lazy(() => import("@/components/Dialog/Delete"));

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
