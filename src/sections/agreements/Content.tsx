import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import AgreementCard from "./Card/AgreementCard";
import AgreementCardSkeleton from "./Card/AgreementCardSkeleton";
import { useState } from "react";
import {
    useDeleteAgreementMutation,
    useFilterAgreementsQuery,
} from "@/services/agreements";
import Pagination, { usePagination } from "@/components/Pagination";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
const DeleteDialog = dynamic(() => import("@/components/Dialog/Delete"));

const PAGE_SIZE = 5;

interface Props {
    // Are we on a property/[propertyId] page or the Agreements page?
    propertyId?: number;
    onEditAgreement: (id: number) => void;
}

const CardsContent: React.FC<Props> = ({ propertyId, onEditAgreement }) => {
    const { filters } = useAgreementsFiltersContext();

    const { data, isLoading } = useFilterAgreementsQuery({
        ...filters,
        propertyId,
    });

    const [deletableAgreement, setDeletableAgreement] = useState(-1);
    const closeDeleteDialog = () => setDeletableAgreement(-1);

    const pagination = usePagination();

    const [deleteAgreement] = useDeleteAgreementMutation();
    const handleDelete = () => deleteAgreement(deletableAgreement);

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
                <DeleteDialog
                    open
                    onClose={closeDeleteDialog}
                    onDelete={handleDelete}
                />
            ) : null}
        </>
    );
};

export default CardsContent;
