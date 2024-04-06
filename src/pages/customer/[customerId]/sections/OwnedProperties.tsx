import { Grid, Typography, Container, Stack } from "@mui/material";
import * as React from "react";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import PropertyCard from "@/components/PropertyCard";
import { useMemo } from "react";

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

interface Props {
    variant?: "default" | "small";
}

const OwnedCustomerPropertiesSection = ({ variant }: Props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;
    const { data, isLoading } = useGetCustomerByIdQuery(+customerId!);

    const belowMd = useResponsive("down", "md");

    const ownedProperties = useMemo(
        () =>
            Array.isArray(data?.ownedProperties) &&
            data.ownedProperties.length > 0
                ? data.ownedProperties
                : [],
        [data]
    );

    if (isLoading || ownedProperties.length === 0) {
        return <Placeholder />;
    }

    return (
        <Panel
            label={t("Owned Properties")}
            childrenSx={{
                p: 0,
            }}
        >
            {belowMd ? (
                <Stack spacing={1}>
                    {ownedProperties.map((p) => (
                        <PropertyCard item={p} selectedMarker={null} />
                    ))}
                </Stack>
            ) : (
                <DataGrid
                    rows={ownedProperties}
                    resource="property"
                    columnVariant={variant}
                    // ...
                    sortingBy="firstName"
                    sortingOrder={"asc"}
                    // ...
                    page={0}
                    pageSize={10}
                    totalRows={25}
                />
            )}
        </Panel>
    );
};

export default OwnedCustomerPropertiesSection;
