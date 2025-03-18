"use client";

import { Grid, GridProps } from "@mui/material";
import PropertyCard from "@/components/Cards/PropertyCard";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterPropertiesQuery } from "src/services/properties";
import { selectAll, setManagerId } from "src/slices/filters";
import useResponsive from "@/hooks/useResponsive";
import Pagination, { usePagination } from "@/components/Pagination";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

interface Props extends Omit<GridProps, "direction"> {
    title?: string;
    subheader?: string;
    sortBy: string;
    direction: string;
}

export default function MediaCard({ sx, sortBy, direction, ...other }: Props) {
    // pagination
    const pagination = usePagination();
    const dispatch = useDispatch();
    const router = useRouter();

    const { assignee } = router.query;

    const belowSm = useResponsive("down", "sm");
    const belowLg = useResponsive("down", "lg");

    const pageSize = belowSm ? 5 : belowLg ? 10 : 25;

    const allFilters = useSelector(selectAll);

    useEffect(() => {
        if (assignee) {
            dispatch(setManagerId(Number(assignee)));
        }
    }, [assignee, dispatch]);

    const { data, isLoading } = useFilterPropertiesQuery({
        filter: allFilters,
        page: pagination.page,
        pageSize,
        sortBy,
        direction,
    });

    const content = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

    return (
        <Pagination
            {...pagination}
            pageSize={pageSize}
            totalItems={data?.totalElements ?? pageSize}
            isLoading={isLoading}
            Container={Grid}
            ContainerProps={{
                container: true,
                py: 2,
                spacing: 1,
                ...other,
            }}
        >
            {content?.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <PropertyCard item={item} />
                </Grid>
            ))}
        </Pagination>
    );
}
