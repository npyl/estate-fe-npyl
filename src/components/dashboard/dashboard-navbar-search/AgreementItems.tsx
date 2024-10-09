import AgreementCard from "@/components/Cards/AgreementCard";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchAgreementsQuery } from "@/services/agreements";
import Grid from "@mui/material/Grid";
import React, { useMemo } from "react";

const PAGE_SIZE = 5;

interface Props {
    search: string;
}

const AgreementItems: React.FC<Props> = ({ search }) => {
    const pagination = usePagination();

    const { data, isLoading } = useSearchAgreementsQuery({
        search,
        page: pagination.page,
        pageSize: PAGE_SIZE,
    });

    const agreements = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

    return (
        <>
            {/* <Pagination
            {...pagination}
            totalItems={data?.totalElements || 5}
            pageSize={PAGE_SIZE}
            isLoading={isLoading}
            Container={Grid}
            ContainerProps={{
                container: true,
                spacing: 1,
            }}
        > */}
            {agreements.map((a) => (
                <Grid key={a.id}>
                    <AgreementCard a={a} />
                </Grid>
            ))}
            {/* </Pagination> */}
        </>
    );
};

export default AgreementItems;
