"use client";

import { Grid, GridProps } from "@mui/material";
import PropertyCard from "@/components/PropertyCard";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFilterPropertiesMutation } from "src/services/properties";
import { selectAll } from "src/slices/filters";

// ----------------------------------------------------------------------

interface Props extends GridProps {
    title?: string;
    subheader?: string;
}

export default function MediaCard({ sx, ...other }: Props) {
    // pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const allFilters = useSelector(selectAll);

    const [filterProperties, { isLoading, data }] =
        useFilterPropertiesMutation();

    useEffect(() => {
        filterProperties({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
        });
    }, [allFilters]);

    const content = useMemo(() => data?.content || [], [data]);

    return (
        <Grid container sx={{ py: 2 }} spacing={1} {...other}>
            {content?.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                    <PropertyCard item={item} selectedMarker={null} />
                </Grid>
            ))}
        </Grid>
    );
}
