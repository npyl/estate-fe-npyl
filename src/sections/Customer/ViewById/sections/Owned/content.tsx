import Grid from "@mui/material/Unstable_Grid2";
import DataGrid from "@/components/DataGrid/Property";
import useResponsive from "@/hooks/useResponsive";
import PropertyCard from "@/components/Cards/PropertyCard";
import Pagination from "@/components/Pagination/client";
import { usePagination } from "@/components/Pagination";
import NoOwnedProperties from "./NoOwnedProperties";
import { FC } from "react";
import { IProperties } from "@/types/properties";

interface Props {
    page: number;
    pageSize: number;
    onChange: (_: any, p: number) => void;
    properties: IProperties[];
    isLoading?: boolean;
}

const OwnedPropertiesContent: FC<Props> = ({
    page,
    pageSize,
    onChange,
    properties,
    isLoading = false,
}) => {
    const pagination = usePagination();

    const belowLg = useResponsive("down", "lg");

    if (!isLoading && properties.length === 0) {
        return <NoOwnedProperties />;
    }

    if (belowLg)
        return (
            <Pagination
                page={page}
                onChange={onChange}
                pageSize={pageSize}
                isLoading={isLoading}
            >
                <Grid container spacing={1}>
                    {properties.map((p) => (
                        <Grid key={p.id} xs={12} sm={6}>
                            <PropertyCard item={p} />
                        </Grid>
                    ))}
                </Grid>
            </Pagination>
        );

    return (
        <DataGrid
            loading={isLoading}
            // ...
            rows={properties}
            // ...
            page={pagination.page}
            pageSize={pageSize}
            totalRows={properties.length}
            onPaginationModelChange={(m) => onChange(null, m.page)}
        />
    );
};

export default OwnedPropertiesContent;
