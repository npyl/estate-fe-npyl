import Placeholder from "./Placeholder";
import DataGrid from "@/components/DataGrid/Property";
import useResponsive from "@/hooks/useResponsive";
import Grid from "@mui/material/Unstable_Grid2";
import PropertyCard from "@/ui/Cards/PropertyCard";
import Pagination from "@/components/Pagination/client";
import { IProperties } from "@/types/properties";

interface MatchingPropertiesContentProps {
    page: number;
    pageSize: number;
    onChange: (_: any, p: number) => void;
    properties: IProperties[];
    isLoading?: boolean;
}

const MatchingPropertiesContent = ({
    properties,
    page,
    onChange,
    isLoading = false,
    pageSize,
}: MatchingPropertiesContentProps) => {
    const belowLg = useResponsive("down", "lg");

    if (properties?.length === 0) {
        return <Placeholder />;
    }

    if (belowLg) {
        return (
            <Pagination
                page={page}
                onChange={onChange}
                isLoading={isLoading}
                pageSize={pageSize}
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
    }

    return (
        <DataGrid
            loading={isLoading}
            rows={properties}
            totalRows={properties?.length}
            page={page}
            pageSize={pageSize}
            onPaginationModelChange={(m) => onChange(null, m.page)}
        />
    );
};

export default MatchingPropertiesContent;
