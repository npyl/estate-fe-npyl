import { Grid, Typography, Container, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import PropertyCard from "@/components/PropertyCard";
import { useMemo } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";

const Placeholder = () => {
    const { t } = useTranslation();

    return (
        <Container
            style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "top",
            }}
        >
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <span style={{ fontSize: "50px" }}>🏠</span>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h5"
                        style={{
                            textAlign: "center",
                            color: "rgba(0, 0, 0, 0.7)",
                        }}
                    >
                        {t("There are no owned properties")}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

const PAGE_SIZE = 5;

interface Props {
    variant?: "default" | "small";
}

const OwnedCustomerPropertiesSection = ({ variant }: Props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;
    const { data, isLoading } = useGetCustomerByIdQuery(+customerId!);

    const [page, setPage] = useState(0);
    const handlePaginationChange = useCallback(
        (m: GridPaginationModel) => setPage(m.page),
        []
    );

    const belowLg = useResponsive("down", "lg");

    const ownedProperties = useMemo(
        () =>
            Array.isArray(data?.ownedProperties) ? data.ownedProperties : [],
        [data]
    );

    if (!isLoading && ownedProperties.length === 0) {
        return <Placeholder />;
    }

    return belowLg ? (
        <Grid container spacing={1}>
            {ownedProperties.map((p) => (
                <Grid item key={p.id} xs={12} sm={6}>
                    <PropertyCard item={p} selectedMarker={null} />
                </Grid>
            ))}
        </Grid>
    ) : (
        <Panel
            label={t("Owned Properties")}
            childrenSx={{
                p: 0,
            }}
        >
            <DataGrid
                skeleton={isLoading}
                // ...
                rows={ownedProperties}
                resource="property"
                columnVariant={variant}
                // ...
                paginationMode="client"
                page={page}
                pageSize={PAGE_SIZE}
                totalRows={ownedProperties.length}
                onPaginationModelChange={handlePaginationChange}
            />
        </Panel>
    );
};

export default OwnedCustomerPropertiesSection;
