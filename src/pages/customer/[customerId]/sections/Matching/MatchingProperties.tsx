import { Box, Divider, Paper, Typography } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoadApi } from "src/components/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape, isPointInsideShapeData } from "src/components/Map/util";
import useGetCustomer from "src/hooks/customer/hook";
import { useSuggestForCustomerQuery } from "src/services/properties";
import { IProperties } from "src/types/properties";
import Placeholder from "./Placeholder";
import PropertyTable from "./PropertyTable";

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

const MatchingPropertiesSection: React.FC = () => {
    const { t } = useTranslation();

    const { isLoaded } = useLoadApi(); // google maps api

    const { customer, customerId } = useGetCustomer();

    const [page, setPage] = useState(0);

    const { data: propertiesPage } = useSuggestForCustomerQuery({
        customerId: +customerId!,
        page,
        pageSize,
    });

    const demands = useMemo(() => customer?.demands || [], [customer?.demands]);

    const totalRows = useMemo(
        () => propertiesPage?.totalElements || 1,
        [propertiesPage?.totalElements]
    );

    const properties = useMemo(() => {
        if (!isLoaded) return [];
        if (!propertiesPage?.content) return [];

        const haveNoShapes = demands?.every((demand) => {
            const shapes = demand?.shapes;
            if (!shapes) return true; // every
            return shapes.every((shape) => !shape);
        });

        // If we have no shapes in our demands; return just the content from the backend
        if (haveNoShapes) return propertiesPage.content;

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
                            ? filterPropertiesInShape(
                                  propertiesPage?.content,
                                  shapeData
                              )
                            : [];
                    })
                    .flat();
            })
            .flat();

        // Keep only the unique entries
        return [...new Set(res)];
    }, [isLoaded, propertiesPage, demands]);

    const handlePaginationChange = useCallback(
        (model: GridPaginationModel) => setPage(model.page),
        []
    );

    if (properties?.length === 0) {
        return <Placeholder />;
    }

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Matching Properties")}</Typography>
            </Box>
            <Divider />
            <PropertyTable
                rows={properties || []}
                totalRows={totalRows}
                page={page}
                pageSize={pageSize}
                onPaginationChange={handlePaginationChange}
            />
        </Paper>
    );
};

export default MatchingPropertiesSection;
