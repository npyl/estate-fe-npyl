import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import AgreementCard from "./Card/AgreementCard";
import AgreementCardSkeleton from "./Card/AgreementCardSkeleton";
import { Suspense, lazy, useEffect, useState } from "react";
import { useFilterAgreementsMutation } from "@/services/agreements";
import Pagination, { usePagination } from "@/components/Pagination";
import { Grid } from "@mui/material";
const DeleteDialog = lazy(() => import("@/components/Dialog/Delete"));

const PAGE_SIZE = 5;

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

    const pagination = usePagination();

    return (
        <>
            <Pagination
                {...pagination}
                isLoading={isLoading}
                pageSize={PAGE_SIZE}
                totalItems={data?.totalElements || PAGE_SIZE}
                // ...
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {isLoading ? (
                    <>
                        <AgreementCardSkeleton />
                        <AgreementCardSkeleton />
                        <AgreementCardSkeleton />
                    </>
                ) : null}

                {data?.content?.map((a) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={a.id}>
                        <AgreementCard
                            a={a}
                            onEdit={onEditAgreement}
                            onDelete={setDeletableAgreement}
                        />
                    </Grid>
                ))}
            </Pagination>

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
