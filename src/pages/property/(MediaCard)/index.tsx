"use client";

import { Grid, GridProps } from "@mui/material";
import PropertyCard from "@/components/PropertyCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFilterPropertiesMutation } from "src/services/properties";
import { selectAll } from "src/slices/filters";
import useResponsive from "@/hooks/useResponsive";
import Pagination from "@/components/Pagination";

// ----------------------------------------------------------------------

interface Props extends Omit<GridProps, "direction"> {
    title?: string;
    subheader?: string;
    sortBy: string;
    direction: string;
}

export default function MediaCard({ sx, sortBy, direction, ...other }: Props) {
    // pagination
    const [page, setPage] = useState(0);
    const handlePageChange = useCallback((_: any, p: number) => setPage(p), []);
    const handlePageExceed = useCallback(() => setPage(0), []);

    const belowSm = useResponsive("down", "sm");
    const belowLg = useResponsive("down", "lg");

    const pageSize = belowSm ? 5 : belowLg ? 10 : 25;

    const allFilters = useSelector(selectAll);

    const [filterProperties, { data, isLoading }] =
        useFilterPropertiesMutation();

    useEffect(() => {
        filterProperties({
            filter: allFilters,
            page,
            pageSize,
            sortBy,
            direction,
        });
    }, [allFilters, page, pageSize, sortBy, direction]);

    const content = useMemo(() => data?.content || [], [data]);

    return (
        <Pagination
            page={page}
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
            onChange={handlePageChange}
            onPageExceedTotal={handlePageExceed}
        >
            {content?.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <PropertyCard item={item} selectedMarker={null} />
                </Grid>
            ))}
        </Pagination>
    );
}
