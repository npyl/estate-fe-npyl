import { useTranslation } from "react-i18next";
import { useSuggestForCustomerQuery } from "@/services/customers";
import Placeholder from "./Placeholder";
import DataGrid from "@/components/DataGrid/Property";
import Panel from "@/components/Panel";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";
import PropertyCard from "@/components/Cards/PropertyCard";
import { usePagination } from "@/components/Pagination";
import Pagination from "@/components/Pagination/client";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";

const PAGE_SIZE = 5;

const MatchingPropertiesSection = () => {
    const { t } = useTranslation();

    const pagination = usePagination();

    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);

    const { data, isLoading } = useSuggestForCustomerQuery(
        { customerId: iCustomerId, page: pagination.page, pageSize: PAGE_SIZE },
        {
            skip: iCustomerId === -1,
        }
    );

    const properties = data?.content || [];

    const belowLg = useResponsive("down", "lg");

    if (!isLoading && properties?.length === 0) {
        return <Placeholder />;
    }

    if (belowLg)
        return (
            <Pagination
                {...pagination}
                isLoading={isLoading}
                pageSize={PAGE_SIZE}
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {properties.map((p) => (
                    <Grid item key={p.id} xs={12} sm={6}>
                        <PropertyCard item={p} />
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
                loading={isLoading}
                // ...
                rows={properties}
                totalRows={properties.length ?? PAGE_SIZE}
                // ...
                paginationMode="client"
                page={pagination.page}
                pageSize={PAGE_SIZE}
                onPaginationModelChange={(m) =>
                    pagination.onChange(null, m.page)
                }
            />
        </Panel>
    );
};

export default MatchingPropertiesSection;
