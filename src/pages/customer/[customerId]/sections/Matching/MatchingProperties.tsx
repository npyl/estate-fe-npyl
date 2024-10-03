import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLoadApi } from "src/components/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape, isPointInsideShapeData } from "src/components/Map/util";
import useGetCustomer from "@/hooks/customer";
import { useSuggestForCustomerQuery } from "src/services/properties";
import { IProperties } from "src/types/properties";
import Placeholder from "./Placeholder";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";
import PropertyCard from "@/components/Cards/PropertyCard";
import { usePagination } from "@/components/Pagination";
import Pagination from "@/components/Pagination/client";

const filterPropertiesInShape = (
    properties: IProperties[],
    shapeData: ShapeData
): IProperties[] =>
    properties.filter(
        (p) =>
            !p.location?.lat ||
            !p.location?.lng ||
            isPointInsideShapeData(p.location?.lat, p.location?.lng, shapeData)
    );

const pageSize = 5;

interface Props {
    variant?: "default" | "small";
}

const MatchingPropertiesSection = ({ variant = "default" }: Props) => {
    const { t } = useTranslation();

    const { isLoaded } = useLoadApi(); // google maps api

    const { customer, customerId } = useGetCustomer();

    const pagination = usePagination();

    const { data, isLoading } = useSuggestForCustomerQuery({
        customerId: +customerId!,
    });

    const demands = useMemo(() => customer?.demands || [], [customer?.demands]);

    const properties = useMemo(() => {
        if (!isLoaded) return [];
        if (!data) return [];

        const haveNoShapes = demands?.every((demand) => {
            const shapes = demand?.shapes;
            if (!shapes) return true; // every
            return shapes.every((shape) => !shape);
        });

        // If we have no shapes in our demands; return just the content from the backend
        if (haveNoShapes) return data;

        // Otherwise, for every demand
        const res = demands
            ?.map((demand) => {
                // Get all shapes
                const shapes = demand?.shapes;
                return shapes
                    ?.map((shape) => {
                        // For every shape
                        const shapeData = decodeShape(shape);

                        // Return filtered properties
                        return shapeData
                            ? filterPropertiesInShape(data, shapeData)
                            : [];
                    })
                    .flat();
            })
            .flat();

        // Keep only the unique entries
        return [...new Set(res)];
    }, [isLoaded, data, demands]);

    const belowLg = useResponsive("down", "lg");

    if (!isLoading && properties?.length === 0) {
        return <Placeholder />;
    }

    if (belowLg)
        return (
            <Pagination
                {...pagination}
                isLoading={isLoading}
                pageSize={pageSize}
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {properties.map((p) => (
                    <Grid item key={p.id} xs={12} sm={6}>
                        <PropertyCard item={p} selectedMarker={null} />
                    </Grid>
                ))}
            </Pagination>
        );

    return (
        <Panel
            label={t("Matching Properties")}
            childrenSx={{
                p: 0,
            }}
        >
            <DataGrid
                skeleton={isLoading}
                // ...
                rows={properties}
                totalRows={properties.length ?? pageSize}
                // ...
                paginationMode="client"
                page={pagination.page}
                pageSize={pageSize}
                onPaginationModelChange={(m) =>
                    pagination.onChange(null, m.page)
                }
            />
        </Panel>
    );
};

export default MatchingPropertiesSection;
