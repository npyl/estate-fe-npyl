import { Grid } from "@mui/material";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import PropertyCard from "@/components/Cards/PropertyCard";
import { useMemo } from "react";
import Pagination from "@/components/Pagination/client";
import { usePagination } from "@/components/Pagination";
import NoOwnedProperties from "./NoOwnedProperties";

const PAGE_SIZE = 5;

const OwnedCustomerPropertiesSection = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { customerId } = router.query;

    const { data, isLoading } = useGetCustomerByIdQuery(+customerId!);
    const ownedProperties = useMemo(
        () =>
            Array.isArray(data?.ownedProperties) ? data.ownedProperties : [],
        [data]
    );

    const pagination = usePagination();

    const belowLg = useResponsive("down", "lg");

    if (!isLoading && ownedProperties.length === 0) {
        return <NoOwnedProperties />;
    }

    if (belowLg)
        return (
            <Pagination
                {...pagination}
                pageSize={PAGE_SIZE}
                isLoading={isLoading}
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {ownedProperties.map((p) => (
                    <Grid item key={p.id} xs={12} sm={6}>
                        <PropertyCard item={p} selectedMarker={null} />
                    </Grid>
                ))}
            </Pagination>
        );

    return (
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
                // ...
                paginationMode="client"
                page={pagination.page}
                pageSize={PAGE_SIZE}
                totalRows={ownedProperties.length}
                onPaginationModelChange={(m) =>
                    pagination.onChange(null, m.page)
                }
            />
        </Panel>
    );
};

export default OwnedCustomerPropertiesSection;
