import { useAgreementsFiltersContext } from "./FiltersBar/FiltersContext";
import AgreementCard from "@/components/Cards/AgreementCard";
import AgreementCardSkeleton from "@/components/Cards/AgreementCard/Skeleton";
import { FC, useCallback, useState } from "react";
import { useFilterAgreementsQuery } from "@/services/agreements";
import Pagination, { usePagination } from "@/components/Pagination";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
const PreparationDialog = dynamic(() => import("./Dialogs/Preparation"));

const PAGE_SIZE = 5;

interface Props {
    // Are we on a property/[propertyId] page or the Agreements page?
    propertyId?: number;
    customerId?: number;
}

const CardsContent: FC<Props> = ({ propertyId, customerId }) => {
    const { filters } = useAgreementsFiltersContext();

    const { data, isLoading } = useFilterAgreementsQuery({
        ...filters,
        propertyId,
        customerId,
    });

    const pagination = usePagination();

    const [editId, setEditId] = useState<number>();
    const closeEdit = useCallback(() => setEditId(undefined), []);

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
                        <AgreementCard a={a} onEdit={setEditId} />
                    </Grid>
                ))}
            </Pagination>

            {editId ? (
                <PreparationDialog
                    editedAgreementId={editId}
                    onClose={closeEdit}
                />
            ) : null}
        </>
    );
};

export default CardsContent;
